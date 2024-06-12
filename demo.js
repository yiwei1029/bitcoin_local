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
  await client.loadWallet('wallet4').then(console.log);
  await client.getNewAddress().then(console.log)
  await client.generateToAddress(10, 'bcrt1qk4fjkdu3psj2rphfsua4yth4w50qe8du8mrq62').then(console.log);
  await client.getBalances().then(console.log);
}
main(client)