require("dotenv").config();
const walletService = require("./WalletService.js");

const SYMBOL = process.env.SYMBOL || "BTC";
const NETWORK = process.env.NETWORK || "bitcoin";
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function menu() {
    console.clear();

    console.log("1 - Create wallet");
    console.log("2 - Send transaction + SYMBOL");
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

    rl.question("Escolha uma opção: ", (answer) => {
        switch (answer) {
            case "1": createwallet (); break;
            case "2":break;
            case "3": break;
            case "4":
                console.log("Exiting...");
                rl.close();
                return; // sai sem reabrir o menu
            case "5": break;
            default:
                console.log("Vai tomar no cu, não tem essa opção!");
        }

        // chama o menu de novo após 1 segundo
        setTimeout(menu, 1000);
    });
}
function createwallet() {
    walletService.createWallet();
    console.log(`Wallet created for ${SYMBOL} on ${NETWORK} network.`);
}
// iniciar o programa
menu();
