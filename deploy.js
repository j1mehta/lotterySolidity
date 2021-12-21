//Provider: Interface b/w blockchain network and web3 JS library
//We need to install a wallet provider for our project through
//`npm install @truffle/hdwallet-provider` and `require` it here.
//For local test network, we used `ganache.provider()` that gave
//us access to the local network as well as unlocked some accounts for us,
//However, for a test network like Rinkeby, we use `truffle/hdwallet-provider`
const HDWalletProvider = require('@truffle/hdwallet-provider');

//Declare an instance of Web3 constructor
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//With Truffle as our provider, we need to provide mnemonic phrase
//for our metamask so we can unlock the metamask account to be used
//for contract deployment + the API endpoint of network we want to
//connect to.
const provider = new HDWalletProvider(
    //Don't bother, you'll only find some Rinkeby eth (if you're lucky)
    'disease possible symptom review save hen phone medal regret canvas rent often',

    //API endpoint to Rinkeby testnet pasted from my Infura account.
    //With ganache, we don't need to provide the network we need to connect to,
    //since it will be local. With truffle, we need to mention the particular network
    //we intend to connect to.
    'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
);

//We've unlocked an account, so we have a source of ether + we've specified
//what network this web3 instance needs to connect to. We can use it to send ether,
//deploy or update contracts or whatever we want.
//This instance of web3 is thus completely enabled for Rinkeby network
const web3 = new Web3(provider);

//We have 2 asynchronous calls below:
// (1) to fetch accounts and another
// (2) to create contract instance
//We'd like to use the async/await syntax for it. So, let's
//define an async fn `deploy` that handles the above two asynchronous
//operations. The await keyword on the async ops will halt the execution
//of our async fn until the promise (the aysnc operation) isn't resolved
const deploy = async () => {
  //get bunch of unlocked accounts provided by truffle wallet provider
  //and deploy the contract from accounts[0]
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  //Lets create an instance of our contract with the constructor Contract.
  //We'll then call deploy and send on that contract instance.
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
