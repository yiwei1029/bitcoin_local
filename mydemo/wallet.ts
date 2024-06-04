import * as bitcoin from 'bitcoinjs-lib'
import ECPairFactory from 'ecpair'
import * as ecc from 'tiny-secp256k1'

const network = bitcoin.networks.regtest
//密钥对工厂
const keyPair = ECPairFactory(ecc)
//创建密钥对
const keyPairInstance = keyPair.makeRandom({ network })
//创建一个新的比特币地址
const { address, pubkey } = bitcoin.payments.p2pkh({ pubkey: keyPairInstance.publicKey, network })
//获取私钥
const privateKey = keyPairInstance.toWIF()
//打印地址、公钥、私钥
console.log('address: ', address)
console.log('publicKey: ', pubkey?.toString('hex'))
console.log('privateKey', privateKey)
// address:  mjZPYc6YJWVHqHnPefR4DqSb83cxnYjYj2
// publicKey:  03567271df0ea179725daa6adcb9e9dc4fe06f6818c971570be2a40383caf444c3
// privateKey cMzpR4xE5vYcK3BH6pkBi6huSsNDMYtyLDMrwZUsKG8WdoMG32Wr
