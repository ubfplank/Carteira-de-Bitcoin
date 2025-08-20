const { Wallet, JsonRpcProvider, ethers } = require("ethers");

// Provider para Binance Smart Chain (BNB)
const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");

function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

function recoverWallet(pkOrMnemonic) {
  let wallet;
  if (pkOrMnemonic.indexOf(" ") !== -1) {
    wallet = Wallet.fromPhrase(pkOrMnemonic);
  } else {
    wallet = new Wallet(pkOrMnemonic);
  }

  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

/**
 * Envia transação (simulação)
 */
async function sendTransaction({ fromAddress, toAddress, amount }) {
  const fakeTxHash = "0x" + Math.floor(Math.random() * 1e16).toString(16);
  console.log(`Simulando envio de ${amount} BNB de ${fromAddress} para ${toAddress}`);
  return fakeTxHash;
}

/**
 * Consulta saldo real usando provider
 */
async function getBalance(address) {
  const balance = await provider.getBalance(address);
  return {
    balanceInWei: balance,
    balanceInEth: Number(ethers.formatEther(balance))
  };
}

module.exports = {
  createWallet,
  recoverWallet,
  sendTransaction,
  getBalance
};

