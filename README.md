# Sarcophagus


## (Development) Getting Started

### Clone repository and install dependencies

```
git clone *
```

then

```
npm install
```

### Node
This project uses Node v12.20.1

Recommended:
use `nvm use` in root directory to switch to the correct node version.

### Create .env
Create `.env` in root directory. Contact development team for environment variables settings.

## Addition Steps
These are the instructions to get start with development of this app. There are steps needed prior to running this app locally.

- Install Wallet

- Deploy local contracts
  - Deploy and Migrate Contracts
  - Copy 'build' folder to `sarcophagus-app` '/src' directory
- Migrate Archaeologists to local contracts (if test archaeologists are needed)
  - Install Go
  - Run command to create test archaeologists

### Install Wallet
You must have MetaMask or a supported wallet to navigate this webApp

Currently Supported:
- MetaMask (Recommended)
- WalletConnect

### Deploy local contracts for development

clone contracts repository @ [Github Contracts Repository](https://github.com/sarcophagus-org/sarcophagus-contracts)
Follow Instruction in contracts Readme to spin up local blockchain

### Archeologists Service
*ensure local blockchain (contracts) is running during this step*
Go will need to be install to be able to use archaeologist-service. For MacOS follow the instructions in the following link to install Go

[Medium.com (blog)](https://medium.com/@jimkang/install-go-on-mac-with-homebrew-5fa421fc55f5)

clone the service repository @ [Github Service Repository](https://github.com/sarcophagus-org/archaeologist-service)

Follow instractions in service repository to get started