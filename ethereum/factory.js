import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xa834794BA4331497cDA95922db86f981469F22F5"
);

export default instance;
