import * as transfer from './transfer'
const adds = []
const mainAdd = {
    mnemonic: 'recycle usual desk speak silent dial emotion injury strong picture setup hold',
    address: 'tb1q3dc2fvscfhqj4gphmfxpnqzv29fk7xw0x0nxag',
    pubkey: '02ac78a742bc9a3a692be5360da135850343091fd55eea95f207b4445ffab85c4a',
    privateKey: 'cSZDbe8MHHRFBTChNLAFkJ4dLK8KzFePac9CFsFKMndKBFAHdvLD'
}
for (let i = 0; i < 2; i++) {
    const add = transfer.generateTestAddress()
    adds.push(add)
    console.log(add)

}

// transfer.getBalance(mainAdd.address).then(console.log)
let amount = 0
transfer.getBalance(mainAdd.address).then(res=>{
     amount = res.balance
     for (let add of adds) {
        console.log(amount)
    
        amount = Math.floor(amount / 100)
        transfer.transfer(mainAdd.privateKey,add.address,amount).then(console.log)
    }
})

