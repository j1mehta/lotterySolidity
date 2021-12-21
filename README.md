# lotterySolidity
A smart contract that lets you participate in a lottery. Real men don't gamble, they buy shitcoins.

#Steps/Versions to get this running
npm install solc@0.4.17 (Don’t need to compile it through cli, we do it in compile.js)
npm install --save mocha ganache-cli web3
npm run test

#To deploy contract on Rinkeby
npm install @truffle/hdwallet-provider
node deploy.js
