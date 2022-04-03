import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xEdc3Ec7c2b1EF8B20765c0aC57dbE24Eb1522F57"
);

export default instance;
