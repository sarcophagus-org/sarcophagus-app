# airfoil-sarcophagus-app


## (Development) Getting Started

### Clone repository and install dependencies

```
git clone *
```

then

```
npm install
```

### Create .env
Create `.env` in root directory. Contact development team for environment variables settings.

## Addition Steps
These are the instructions to get start with development of this app. There are steps needed prior to running this app locally.

- Install Wallet

- Deploy local contracts
  - Deploy and Migrate Contracts
  - Copy 'build' folder to `airfoil-sarcophagus-app` '/src' directory
- Migrate Archaeologists to local contracts (if test archaeologists are needed)
  - Install Go
  - Run command to create test archaeologists

### Install Wallet
You must have MetaMask or a supported wallet to navigate this webApp

Currently Supported:
- MetaMask (Recommended)
- WalletConnect
### Deploy local contracts for development

clone V2-contracts repository @ [Github Repository](https://github.com/decent-labs/airfoil-sarcophagus-v2-contracts)
Follow Instruction in V2-contracts Readme to spin up local blockchain

Copy 'build' folder and paste to `airfoil-sarcophagus-app` '/src' directory
if needed update .env `REACT_APP_LOCAL_SARCOPHAGUS_ADDRESS` with deployed contract address given in the terminal.

### Migrate Development Archeologists ((optional) If test archaeologists are needed)
*ensure local blockchain is running during this step*
Go will need to be install to be able to use archaeologist-service. For MacOS follow the instructions in the following link to install Go

[Medium.com (blog)](https://medium.com/@jimkang/install-go-on-mac-with-homebrew-5fa421fc55f5)

clone V2-contracts repository @ [Github Repository](https://github.com/decent-labs/airfoil-sarcophagus-archaeologist-service)

Navigate to root directory of project and install dependencies
```
go get
```

Change branch `web_app_seed_data` and in the terminal run
```
go run cmd/seed.go
```