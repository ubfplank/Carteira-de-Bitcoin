const { Wallet } = require("ethers");

function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

async function sendTransaction({ fromAddress, toAddress, amount }) {
  const fakeTxHash = "0x" + Math.floor(Math.random() * 1e16).toString(16);
  console.log(`Simulando envio de ${amount} BNB de ${fromAddress} para ${toAddress}`);
  return fakeTxHash;
}

function recoverWallet(pkOrMnemonic, provider) {
  let wallet;

  if (pkOrMnemonic.indexOf(" ") !== -1) {
    wallet = Wallet.fromPhrase(pkOrMnemonic, provider);
  } else {
    wallet = new Wallet(pkOrMnemonic, provider);
  }

  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

module.exports = {
  createWallet,
  recoverWallet,
  sendTransaction
};

