const { Wallet, axios } = require("axios");

// Cria carteira aleatória
function createWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
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
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  const balance = await provider.getBalance(address);

  return {
    balanceInWei: balance,
    balanceInEth: ethers.formatEther(balance)
  };
}

// Validação de endereço
function addressIsValid(address) {
  return ethers.isAddress(address);
}

// Monta transação
async function buildTransaction(wallet, toWallet, amountInEth) {
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  const amount = ethers.parseEther(amountInEth);

  const tx = {
    to: toWallet,
    value: amount
  };

  const feeData = await provider.getFeeData();
  const txFee = 21000n * feeData.gasPrice;

  const balance = await provider.getBalance(wallet.address);
  if (balance < (amount + txFee)) {
    return false;
  }
  return tx;
}

// Envia transação
async function sendTransaction(wallet, tx) {
  return await wallet.sendTransaction(tx);
}
function sendTransaction(tx){
  return myWallet.sendTransaction(tx);
}
function getTransaction(hash){
  return provider.getTransaction(hash);
}

module.exports = {
  createWallet,
  recoverWallet,
  getBalance,
  buildTransaction,
  sendTransaction,
  addressIsValid,
  getTransaction,
};



