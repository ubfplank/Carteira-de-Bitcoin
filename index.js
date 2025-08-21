require('dotenv').config(); 
const walletService = require("./WalletService.js");
const readline = require("readline");
const { ethers } = require("ethers"); // 👈 necessário para instanciar o wallet

const SYMBOL = process.env.SYMBOL || "BNB";
const NETWORK = process.env.NETWORK || "binance";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// helper async para readline
const ask = (q) => new Promise((resolve) => rl.question(q, (ans) => resolve(ans.trim())));

let myWallet = null; // guarda { address, privateKey }
let myAddress = null; // guarda o address globalmente

async function menu() {
  console.clear();

  console.log("1 - Create wallet");
  console.log("2 - Recover Wallet");
  console.log("3 - Send BNB");
  console.log("4 - Exit");
  console.log("5 - Balance");

  const answer = await ask("Escolha uma opção: ");

  switch (answer) {
    case "1":
      await createWallet();
      break;
    case "2":
      await recoverWallet();
      break;
    case "3": sendTx(); break;
    case "4": getTransaction(); break;
    case "5":await getBalance(); break;
    default: console.log("Opção inválida!"); await pause();
  }

  await menu();
}

async function pause() {
  await ask("Pressione ENTER para continuar...");
}

async function createWallet() {
  myWallet = walletService.createWallet();
  myAddress = myWallet.address;

  console.log(`Your new wallet:`);
  console.log(myAddress);
  console.log("PK: " + myWallet.privateKey);

  await pause();
}

async function recoverWallet() {
  console.clear();
  const pkOrMnemonic = await ask("What is your private key or phrase mnemonic? ");
  myWallet = walletService.recoverWallet(pkOrMnemonic);
  myAddress = myWallet.address;

  console.log(`Your recovered wallet:`);
  console.log(myAddress);

  await pause();
}

async function getBalance() {
  console.clear();

  if (!myAddress) {
    console.log(`You do not have a wallet yet`);
    await pause();
    return;
  }

  // usa a variável importada walletService
  const { balanceInEth } = await walletService.getBalance(myAddress);
  console.log(`${SYMBOL} ${balanceInEth}`);

  await pause();
}

function sendTx(){
  console.clear();

  if(!myAddress) {
    console.log (`You do not gave a wallet yet`);
    return menu();
  }
  console.log (`Your wallet is ${myAddress}`);
  rl.question (`To Wallet:`, (toWallet) => {
    if(!walletService.addressIsValid(toWallet)){
      console.log(`Invalid wallet!`);
      return menu();
    }

    rl.question (`Amount (in ${SYMBOL}): `, async (amountInEth) =>{
      if(!amountInEth){
        console.log(`Invalid amount!`);
        return menu();
      }

      // cria instância de wallet com provider
      const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
      const walletInstance = new ethers.Wallet(myWallet.privateKey, provider);

      const tx = await walletService.buildTransaction(walletInstance, toWallet, amountInEth);

      if(!tx){
        console.log(`Insufficient balance (amount + fee)!`);
        return menu();
      }
      try{
        const txReceipt = await walletService.sendTransaction(walletInstance, tx);
        console.log(`Transaction successful`);
        console.log(txReceipt);

      }
      catch (err){
        console.error(err);
      }
      return menu();

    })
  })

  menu();
}

function getTransaction(){
  console.clear();

  rl.question(`Ypur tx hash:`, async(hash) =>{
    const txReceipt = await walletService.getTransaction(hash);
    console.log (`Your tx receipt:`);
    console.log(txReceipt);
  })
}
menu();
