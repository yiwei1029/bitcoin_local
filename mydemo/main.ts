import * as transfer from './transfer'
const adds = []
const mainAdd = {
    mnemonic: 'old fit orient spend margin nature weird firm pluck town screen keen',
    address: 'tb1q5khwda5tf6jrlcwuk4wy24lyynr5gczcxqmjea',
    pubkey: '02a302df6673154a2c12f5582e1351742f2f2707bb7f78f7b354d78d7a0e83ce99',
    privateKey: 'cN43B6UUZm1VKRKgU3hS5QDFj9bGzAiam4mwhtM5S1ZxGRfx8kDr'
}
for (let i = 0; i < 2; i++) {
    const add = transfer.generateTestAddress()
    adds.push(add)
    // console.log(add)

}

// transfer.getBalance(mainAdd.address).then(console.log)
// let amount = 0
transfer.getBalance(mainAdd.address).then(res => {
    //  amount = res.balance
    // console.log(amount)
    let amount = 100
    transfer.transfer(mainAdd.privateKey, adds[0].address, amount).then(console.log)
})

