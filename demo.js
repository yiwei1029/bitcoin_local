const Client = require('bitcoin-core');
const client = new Client({
  network: 'regtest',
  username: 'user',
  password: 'pass',
  port: 18443,
  timeout: 10000,
  // wallet:'wallet4'
});
// const wallet1 = new Client({
//   network: 'regtest',
//   wallet: 'wallet.dat',
//   username: 'user',
//   password: 'pass',
//   port: 18443,
// });
// client.getBestBlockHash().then(console.log);
// client.createWallet('wallet4').then(console.log);
// client.loadWallet('wallet4').then(console.log);
async function main(client) {
  try {
    await client.loadWallet('wallet4').then(console.log);
  } catch (error) {
    console.log(error);
  }
  const newAddress = await client.getNewAddress()
  await client.generateToAddress(100, newAddress)
  await client.getBalances()
  const toAddress = await client.getNewAddress()
  console.log({ toAddress })
  const txHash = await client.sendToAddress(toAddress, 10)
  // const code = await client.getRawTransaction(txHash)
  // await client.decodeRawTransaction(code).then(console.log);

  await client.getReceivedByAddress('bcrt1quxlymz9ylxjnkt3arxzgsf8ug0cm7xrq3g3mq2').then(console.log);
}
main(client)