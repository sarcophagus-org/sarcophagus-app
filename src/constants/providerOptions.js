import WalletConnectProvider from "@walletconnect/web3-provider";

export const PROVIDER_OPTIONS = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_WALLET_CONNECT_INFURA_ID,
    },
  },
}