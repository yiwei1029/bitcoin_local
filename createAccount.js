
const bitcoin = require('bitcoinjs-lib')
const ecc = require('tiny-secp256k1')
const { ECPairFactory } = require('ecpair')

const ECPair = ECPairFactory(ecc);
const TESTNET = bitcoin.networks.testnet;


const keyPair = ECPair.makeRandom({ network: TESTNET });
const { address } = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: TESTNET,
});

console.log({
  address,
  key: keyPair.toWIF(),
  pubkey: keyPair.publicKey.toString('hex'),
  pubkeyHash: (bitcoin.crypto.hash160(keyPair.publicKey)).toString('hex')
});

// address: 'n2xTGfogzGRksDU1nXJFo8j69S7PgJ88bM',
//   key: 'cSgFFUAjNREKDq59wYFiK2AhcU8k7Acb4vVn1Yc9srM67iUVbzv1',
//   pubkey: '038039474ac5fb925b61aeb37fdf0a0696c92f262cd96bcdd8d4b770189d35a346',
//   pubkeyHash: 'eb2d3a8326a5f3e0931428e71bf5e4ed699f06bc'


// mqnKrFDZaobLfcfGw4vniG6hF4uuz14jxS