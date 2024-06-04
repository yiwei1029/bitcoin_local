
const bitcoin = require('bitcoinjs-lib')
const ecc = require('tiny-secp256k1')
const {ECPairFactory} = require('ecpair')

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

// address: 'mpApqrb5buVGXLBHL4ty2f82veh8W8ijDe',
// key: 'cW6mrWmqmtiA7hE6EeMWKAmsGMPt8uAC6yWc6jum33upAgtLqMFf',
// pubkey: '03e61bc7c04c1fae6f5eac7e3b0139f67b215c0e3c394288ae6e37bcc8284b189c',
// pubkeyHash: '5eea97ab49c927e1236f261a2b8c30e2d1a011fa'


// mqnKrFDZaobLfcfGw4vniG6hF4uuz14jxS