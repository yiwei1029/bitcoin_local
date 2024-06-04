const Client = require('bitcoin-core');
const client = new Client({
  network: 'regtest',
  username: '123',
  password: '123',
  port: 18333
});

client.getBlockchainInformation(0).then((msg) => console.log(msg));
// client.getRawTransaction('c417a616a187dae2035380dd0acd06f8df7428056daa5bc68eca47a262cce7c4').then(async (raw) =>{
//     const tx = await client.decodeRawTransaction(raw)
//     console.log({raw,tx });
//     console.log(tx.vout);
//     console.log(raw);
// });

// client.sendRawTransaction('0200000001c6a01a74931c778366e2feaed1968bbe6ddb131df2fb81511f7abcf9998326b3000000006b483045022100e4ae8319bfd5acbac7dd0b0058edd1a79058b44a0abc141b7635c08c10885eae02201809d8d606640b61afb7b07713ef4eb15bd5d63f87bf48c21446157e76d8d25b012103e61bc7c04c1fae6f5eac7e3b0139f67b215c0e3c394288ae6e37bcc8284b189cffffffff0120003177000000001976a91470997d9167c89decc4cfa63a94bcc332edb2c46b88ac00000000')
// .then((help) => console.log(help));
// c417a616a187dae2035380dd0acd06f8df7428056daa5bc68eca47a262cce7c4