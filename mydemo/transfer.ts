import * as bitcoin from 'bitcoinjs-lib'
import ECPairFactory from 'ecpair'
import * as ecc from 'tiny-secp256k1'
import { sign, verify } from 'bitcoinjs-message'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import fetch from 'node-fetch'
import methods from 'bitcoin-core/src/methods'
// 查询余额
export async function getBalance(address: string) {
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`
    const res = await fetch(url)
    return await res.json()

}
export async function getUTXO(address: string) {
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/?unspentOnly=true`
    const res = await fetch(url)
    return await res.json()

}
// 交易详情
export async function getTx(txHash: string) {
    const url = `https://api.blockcypher.com/v1/btc/test3/txs/${txHash}`
    const res = await fetch(url)
    return await res.json()

}
//广播交易
export async function broadCast(txHex: string) {
    const url = `https://api.blockcypher.com/v1/btc/test3/txs/push`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ tx: txHex })
    }
    )
    return await res.json()
}
// 转账 
export async function transfer(privateKey: string, toAddress: string, amount: number) {
    const validator = (publicKey: Buffer, messageHash: Buffer, signature: Buffer) => {
        return ECPairFactory(ecc).fromPublicKey(publicKey).verify(messageHash, signature)
    }
    const alice = ECPairFactory(ecc).fromWIF(privateKey, bitcoin.networks.testnet)
    // console.debug(alice.privateKey,alice.publicKey)
    const fromAddress = bitcoin.payments.p2wpkh({
        pubkey: alice.publicKey,
        network: bitcoin.networks.testnet
    }).address
    const utxo = await getUTXO(fromAddress!)
    if (!utxo || utxo.txrefs.length === 0) {
        throw new Error('No UTXO found')
    }
    // console.log('uxto', utxo,'\n')
    //选择最后一个utxo转账
    const uxtoToUse = utxo.txrefs[utxo.txrefs.length - 1]
    const txHash = uxtoToUse.tx_hash
    const tx = await getTx(txHash)
    // console.log(tx)
    const scriptPubKey = tx.outputs[1].script
    // console.debug('scriptPubKey', scriptPubKey)
    //psbt 实例 partial signed bitcoin transaction
    const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet })
    const fee = 1000
    psbt.addInput({
        hash: txHash,
        index: uxtoToUse.tx_output_n, //
        witnessUtxo: {
            script: Buffer.from(scriptPubKey, 'hex'),
            value: uxtoToUse.value
        }
    })
    psbt.addOutput({
        address: toAddress,
        value: amount
    })
    const change = uxtoToUse.value - amount - fee
    if (change > 0) {
        psbt.addOutput({
            address: fromAddress!,
            value: change
        })
    }
    psbt.signInput(0, alice)
    psbt.validateSignaturesOfInput(0, validator)
    psbt.finalizeAllInputs()
    const txHex = psbt.extractTransaction().toHex()
    // console.debug('txHex', txHex)
    //广播
    const res = await broadCast(txHex)
    return res
}
// 生成测试网地址
export function generateTestAddress() {
    const network = bitcoin.networks.testnet
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.BIP32Factory(ecc).fromSeed(seed)
    const path = "m/44'/0'/0'/0/0"
    const child = root.derivePath(path)
    const keyPair = ECPairFactory(ecc).fromPrivateKey(child.privateKey!,
        { network: bitcoin.networks.testnet });
    const { address, pubkey } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey!, network })
    const privateKey = keyPair.toWIF()

    return { mnemonic, address, pubkey: pubkey?.toString('hex'), privateKey }

}
// const wallet0 = generateTestAddress()
// console.log('wallet', wallet0)
const alice = {
    mnemonic: 'recycle usual desk speak silent dial emotion injury strong picture setup hold',
    address: 'tb1q3dc2fvscfhqj4gphmfxpnqzv29fk7xw0x0nxag',
    pubkey: '02ac78a742bc9a3a692be5360da135850343091fd55eea95f207b4445ffab85c4a',
    privateKey: 'cSZDbe8MHHRFBTChNLAFkJ4dLK8KzFePac9CFsFKMndKBFAHdvLD'
}
const bob = {
    mnemonic: 'old fit orient spend margin nature weird firm pluck town screen keen',
    address: 'tb1q5khwda5tf6jrlcwuk4wy24lyynr5gczcxqmjea',
    pubkey: '02a302df6673154a2c12f5582e1351742f2f2707bb7f78f7b354d78d7a0e83ce99',
    privateKey: 'cN43B6UUZm1VKRKgU3hS5QDFj9bGzAiam4mwhtM5S1ZxGRfx8kDr'
}
// getBalance(alice.address).then(console.log)
// getUTXO(alice.address).then(console.log)
// getTx('f65c840246486961d86174cfc8089d8b67b1f148d4e7f34d8c3ad23f65446928').then(console.log)
// transfer(alice.privateKey, bob.address, 100).then(console.log)
// getBalance(alice.address).then(console.log)