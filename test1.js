const { Wallet } = require("axios");

const wallet = Wallet.createRandom();
console.log(wallet.address, wallet.privateKey);

0x8e6818a14cb12287449f1fc29f1c80c94f878b90972ce8f261189e215907dc48