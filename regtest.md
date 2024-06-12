cmd=>C:\Program Files\Bitcoin\daemon


<img title="" src="file:///C:/Users/Administrator/AppData/Roaming/marktext/images/2024-06-12-00-45-15-image.png" alt="" width="367">

**bitcoind**: bitcoind -regtest -txindex=1 -fallbackfee=0.001 -rpcpassword=pass -rpcuser=user

**创建钱包**

bitcoin-cli -regtest createwallet [钱包名]

**加载钱包**

bitcoin-cli -regtest loadwallet [钱包] (刚创建不需要load)
generate: bitcoin-cli -regtest getnewaddress

``bitcoin-cli -regtest generatetoaddress 2 bcrt1qsthw8ygqec64sap9y2el242jteqmvx4870uga0``
mining: bitcoin-cli -regtest generatetoaddress [数量] [address]
getbalance: bitcoin-cli -regtest getbalance
sending: sendtoaddress [地址] [数量]
getrawtransaction/getransaction
decoderawtransaction