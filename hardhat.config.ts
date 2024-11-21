import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      chainId: 11155111,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    },
    mainnet: {
      url: process.env.MAINNET_RPC,
      chainId: 1,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/"
        }
      }
    ]
  },
  solidity: {
    compilers: [
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.4.24",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
          viaIR: true,
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: { enabled: true },
  sourcify: {
    enabled: true
  },
};

export default config;
