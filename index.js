require("dotenv").config();
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
  console.log(`2 - Send transaction (${SYMBOL})`);
  console.log("3 - Receive transaction");
  console.log("4 - Exit");
  console.log("5 - Ask question");
  console.log("6 - Balance");
  console.log("7 - View transactions");
  console.log("8 - View wallet address");
  console.log("9 - Choose A or B");
  console.log("10 - View wallet details");
  console.log("11 - View transaction history");
  console.log("12 - View network status");
  console.log("13 - View node information");

  const answer = await ask("Escolha uma opção: ");

  switch (answer) {
    case "1":
      await createWallet();
      break;

    case "2":
      await handleSendTransaction();
      break;

    case "3":
      console.log("Receive transaction não implementado ainda.");
      break;

    case "4":
      console.log("Exiting...");
      rl.close();
      return;

    case "5":
      console.log("Ask question não implementado ainda.");
      break;

    default:
      console.log("Vai tomar no cu, não tem essa opção!");
  }

  await pause();
  return menu();
}

async function pause() {
  await ask("Pressione ENTER para continuar...");
}

async function createWallet() {
  try {
    myWallet = walletService.createWallet();
    console.log("Wallet criada com sucesso!");
    console.log("Address:", myWallet.address);
    console.log("Private Key (guarde com segurança!):", myWallet.privateKey);
  } catch (err) {
    console.error("Erro ao criar carteira:", err?.message || err);
  }
}

async function handleSendTransaction() {
  try {
    if (!myWallet) {
      console.log("Crie/importe uma carteira primeiro (opção 1).");
      return;
    }

    const toAddress = await ask("To address: ");
    const amountStr = await ask(`Amount in ${SYMBOL}: `);
    const amount = Number(amountStr.replace(",", "."));

    if (!toAddress) {
      console.log("Endereço de destino inválido.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      console.log("Valor inválido.");
      return;
    }

    const txId = await walletService.sendTransaction({
      fromAddress: myWallet.address,
      toAddress,
      amount
    });

    console.log("Transação enviada com sucesso!");
    console.log("TX ID:", txId);
  } catch (err) {
    console.error("Falha ao enviar transação:", err?.message || err);
  }
}

// iniciar o programa
menu();
