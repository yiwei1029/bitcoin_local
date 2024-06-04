import * as bitcoin from 'bitcoinjs-lib'
import ECPairFactory from 'ecpair'
import * as ecc from 'tiny-secp256k1'
import { sign, verify } from 'bitcoinjs-message'
// 1. 定义私钥
const privateKey = 'cMzpR4xE5vYcK3BH6pkBi6huSsNDMYtyLDMrwZUsKG8WdoMG32Wr'
const keyPair = ECPairFactory(ecc).fromWIF(privateKey, bitcoin.networks.regtest)
// const pubkey = keyPair.publicKey
const msg = 'hello world'
const signature = sign(msg, keyPair.privateKey!, keyPair.compressed)
const { address} = bitcoin.payments.p2pkh({ pubkey :keyPair.publicKey})
console.debug(signature.toString('base64'))
const result = verify(msg,address! , signature)
console.log('result', result)
// console.log(p2wpkhAddress)
// console.log(address)
// console.log(pubkey.toString('hex'))

// bc1q93txn4mc8cf46v5jae2mu6kufdk6a25e65wpl8
// 153SFZ1ZVV434BJmw6SgPvEGG42FuhFq1X
// 03567271df0ea179725daa6adcb9e9dc4fe06f6818c971570be2a40383caf444c3