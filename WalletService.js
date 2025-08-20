const { Wallet } = require("ethers");

async function createWallet() {
  myWallet = walletService.createWallet();
  const myAddress = myWallet.address;

  console.log(`Your new wallet:`);
  console.log(myAddress);
  console.log("PK: " + myWallet.privateKey);

  await pause(); // pausa para o usuário ler
  // Não chame menu() aqui
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
  let wallet;

  if (pkOrMnemonic.indexOf(" ") !== -1) {
    // Se tiver espaço, é uma mnemonic phrase
    wallet = Wallet.fromPhrase(pkOrMnemonic, provider);
  } else {
    // Senão, é uma private key
    wallet = new Wallet(pkOrMnemonic, provider);
  }

  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

// Exporta todas as funções corretamente
module.exports = {
  createWallet,
  sendTransaction,
  recoverWallet
};

