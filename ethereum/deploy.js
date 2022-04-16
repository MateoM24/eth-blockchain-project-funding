// deploy code will go here
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const compiledFactory = require("./build/CampaignFactory.json");

// Mnemonic goes as 1st argument.
// You should put it in for example environmental variable for safety
// 2nd argument is URL fot network you're gonna connect to.
const provider = new HDWalletProvider(
  "only quiz price hen fade much snow return scheme runway execute electric",
  "https://rinkeby.infura.io/v3/64fdbcfc60834ecb9b24e95eb886f7c0"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

try {
  deploy();
} catch (err) {
  console.log(JSON.parse(err));
}

// Attempting to deploy from account 0xDBB8dE2Ce46F880B48768a22491410a1e79b5a53
// Contract deployed to 0xa834794BA4331497cDA95922db86f981469F22F5
