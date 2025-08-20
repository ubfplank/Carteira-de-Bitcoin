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
      await createWallet();
      break;

    case "2":
      recoverWallet();
      break;

    case "3":break;

    case "4": break;

    case "5":break;

    default:
      console.log("Vai tomar no cu, não tem essa opção!");
      await menu();
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
    const myWallet = walletService.recoverWallet(pkOrMnemonic); // usa a variável global
     myAddress = myWallet.address;

    console.log(`Your recovered wallet: `);
    console.log(myAddress);

    pause().then(() => menu());
  });
}

menu();
