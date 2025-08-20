const { Wallet, ethers } = require("ethers");

// Cria carteira aleatória
function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

// Simula envio de transação
async function sendTransaction({ fromAddress, toAddress, amount }) {
  const fakeTxHash = "0x" + Math.floor(Math.random() * 1e16).toString(16);
  console.log(`Simulando envio de ${amount} BNB de ${fromAddress} para ${toAddress}`);
  return fakeTxHash;
}

// Recupera carteira a partir de PK ou mnemonic
function recoverWallet(pkOrMnemonic) {
  let wallet;

  if (pkOrMnemonic.includes(" ")) {
    wallet = Wallet.fromPhrase(pkOrMnemonic);
  } else {
    wallet = new Wallet(pkOrMnemonic);
  }

  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

// Consulta saldo real
async function getBalance(address) {
  // Definindo provider da Binance Smart Chain (BSC)
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

  const balance = await provider.getBalance(address);

  return {
    balanceInWei: balance,
    balanceInEth: ethers.formatEther(balance)
  };
}

module.exports = {
  createWallet,
  recoverWallet,
  sendTransaction,
  getBalance
};
