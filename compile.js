//Ok, so we need to compile the solidity code in lottery.sol
//For that, we can't import the file as require('./contracts/lottery.sol'); -->BAD!
//Reason: Whenever we `require( )` a file in a node project, the node engine will
//attempt to execute the content of that file as javascript code. Thus, it'll throw error
//since it will find something else (solidity) instead of js code.


//Since we can't `require` the lottery.sol file, we'll need to read
//the contents out of our file from our filesystem. For that, we need
// modules - path & fs (standard modules, so no need to `npm install`)
const path = require('path'); //guarantees correct path on windows/unix systems
const fs = require("fs");
const solc = require("solc");

//Lets define the path to lottery.sol.
//__dirname: a constant defined by node that gets set to current working dir (so gets us in ~/lottery)
const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Lottery"];
