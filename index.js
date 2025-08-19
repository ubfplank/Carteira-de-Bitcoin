const readline = require("readline");
const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function menu() {
    console.clear();

    console.log("1 - Create wallet");
    console.log("2 - Send transaction");
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

    rl.question (" voce prefere A ou B? ", (answer) => { 
    if( answer === "A") {
        console.log(" Você escolheu A!");
    }
    else if(answer ==="b") {
    console.log(" Sua resposta foi: " + answer);
    })
}
