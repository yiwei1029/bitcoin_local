const Client = require('bitcoin-core');
const client = new Client({
  network: 'regtest',
  username: 'user',
  password: 'pass',
  port: 18443,
  timeout: 10000,
});
// const wallet1 = new Client({
//   network: 'regtest',
//   wallet: 'wallet.dat',
//   username: 'user',
//   password: 'pass',
//   port: 18443,
// });
client.getTransaction('92dcf2049ca3e29604be17d830bb9e3a42fef630fa3685afed01f7b31d1051e9').then(res => {
  client.decodeRawTransaction(res).then(console.log);
});