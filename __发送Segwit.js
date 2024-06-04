const bitcoin = require('bitcoinjs-lib')
const ecc = require('tiny-secp256k1')
const { ECPairFactory } = require('ecpair')

const ECPair = ECPairFactory(ecc);
const TESTNET = bitcoin.networks.testnet;

const keyPair = ECPair.fromWIF('cW5Ytm4fXA8MAhV6RYiv2KsCpUZmHVM2fTGscHf4kKzUd5TMq7yG', TESTNET);
const { address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: TESTNET,
});

// console.log(address);

const psbt = new bitcoin.Psbt({ network: TESTNET });
// // pay-to-witness-pubkey-hash
// // p2wpkh
psbt.addInput({
  hash: 'e0609be9666e0e1ee58fb3edc02e134073dbfe112581b826f0d8e76857c3247e',
  index: 0,
  witnessUtxo: {
    script: Buffer.from('00141f10798d435e49d7b15b57770f42083448960ee3', 'hex'),
    value: 500000,
  },
});

psbt.addOutput({
  address: 'tb1qx4l2z7nykzee84j06jn2hvghefxfh7syz43wfg',
  value: 500000 - (0.03 * 500000),
});

psbt.signInput(0, keyPair);

const validator = (pubkey, msghash, signature) => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

psbt.validateSignaturesOfInput(0, validator);
psbt.finalizeAllInputs();
const tx = psbt.extractTransaction().toHex()
console.log(tx);