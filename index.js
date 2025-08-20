require('dotenv').config();
const walletService = require("./WalletService.js");
const readline = require("readline");

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
  console.log("3 - Receive transaction");
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
    case "3":
      break;
    case "4":
      process.exit(0); // sair do programa
    case "5":
      await getBalance();
      break;
    default:
      console.log("Opção inválida!");
      await pause();
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

menu();

