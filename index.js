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
      createWallet();
      break;
    case "2":
      recoverWallet();
      break;
    case "3":
      break;
    case "4":
      process.exit(0); // sai do programa
      break;
    case "5":
      getBalance();
      break;
    default:
      console.log("Opção inválida!");
  }

  await pause();
  return menu();
}

async function pause() {
  await ask("Pressione ENTER para continuar...");
}

function createWallet() {
  myWallet = walletService.createWallet();
  const myAddress = myWallet.address;

  console.log(`Your new wallet:`);
  console.log(myAddress);
  console.log("PK: " + myWallet.privateKey);
}

function recoverWallet() {
  console.clear();
  rl.question("What is your private key or phrase mnemonic? ", (pkOrMnemonic) => {
    myWallet = walletService.recoverWallet(pkOrMnemonic);
    const myAddress = myWallet.address;

    console.log(`Your recovered wallet:`);
    console.log(myAddress);

    pause().then(() => menu());
  });
}

async function getBalance() {
  console.clear();

  if (!myWallet) {
    console.log(`You do not have a wallet yet`);
    await pause();
    return menu();
  }

  const { balanceInEth } = await walletService.getBalance(myWallet.address);
  console.log(`${SYMBOL} ${balanceInEth}`);

  await pause();
}

menu();

