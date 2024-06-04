const bitcoin = require('bitcoinjs-lib')
const ecc = require('tiny-secp256k1')
const { ECPairFactory } = require('ecpair')

const ECPair = ECPairFactory(ecc);
const TESTNET = bitcoin.networks.testnet;

const keyPair = ECPair.fromWIF('cW6mrWmqmtiA7hE6EeMWKAmsGMPt8uAC6yWc6jum33upAgtLqMFf', TESTNET);

const psbt = new bitcoin.Psbt({ network: TESTNET });
// pay-to-witness-pubkey-hash
// p2wpkh
psbt.addInput({
  hash: 'b3268399f9bc7a1f5181fbf21d13db6dbe8b96d1aefee26683771c93741aa0c6',
  index: 0,
  nonWitnessUtxo: Buffer.from(
    '020000000001010a0e4e299a43814354581e6a4c31c4d11a618c9ae63ba3543931c8b6604e50f10000000000fdffffff0200943577000000001976a9145eea97ab49c927e1236f261a2b8c30e2d1a011fa88ac9424d0b2000000001976a9140330a7b160c4b99018078478b1dc713b215624ba88ac02473044022000eec8dd232a575aaaea1b5bf025597a2eb57731a05584bef4c410580da2112502200ede3c72e57438eeef6a9564961e7c08f96fbfc64c486ddcdddc68a0f22ee0f3012103cad05d29b232a4120e793ef998d6740606e02baa8b1db1ed53d597abf2e9a55a00000000',
    'hex',
  ),
});

psbt.addOutput({
  address: 'mqnKrFDZaobLfcfGw4vniG6hF4uuz14jxS',
  value: 2000000000 - (0.003 * 100000000),
});

psbt.signInput(0, keyPair);

const validator = (pubkey, msghash, signature) => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

psbt.validateSignaturesOfInput(0, validator);
psbt.finalizeAllInputs();
const tx = psbt.extractTransaction().toHex()
console.log(tx);