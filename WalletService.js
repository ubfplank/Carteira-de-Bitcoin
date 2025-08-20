const { Wallet } = require("ethers");

function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

/**
 * Envia transação (stub)
 * Apenas simula envio
 */
async function sendTransaction({ fromAddress, toAddress, amount }) {
  const fakeTxHash = "0x" + Math.floor(Math.random() * 1e16).toString(16);
  console.log(`Simulando envio de ${amount} BNB de ${fromAddress} para ${toAddress}`);
  return fakeTxHash;
}

function recoverWallet(pkOrMnemonic, provider) {

  
}

