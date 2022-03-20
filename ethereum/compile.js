import path, { dirname } from "path";
import solc from "solc";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(
  JSON.stringify({
    language: "Solidity",
    sources: {
      "Campaign.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  })
);

fs.ensureDirSync(buildPath);
const contracts = JSON.parse(output).contracts["Campaign.sol"];
// console.log(JSON.parse(output));
for (let contractName in contracts) {
  //   console.log(contracts[contractName].abi);
  console.log(path.resolve(buildPath, contractName + ".json"));
  fs.outputJsonSync(
    path.resolve(buildPath, contractName + ".json"),
    contracts[contractName]
  );
}
