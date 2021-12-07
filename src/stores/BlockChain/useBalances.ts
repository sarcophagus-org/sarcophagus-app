import { useState, useEffect } from "react";
import { BigNumber, Contract } from "ethers";
import { useWeb3 } from "../../web3";

const useSarcoBalance = (sarcophagusTokenContract: Contract | undefined, currentBlock: number) => {
  const { account } = useWeb3();
  const [balance, setBalance] = useState(BigNumber.from(0));

  useEffect(() => {
    if (!account || !sarcophagusTokenContract) return;

    sarcophagusTokenContract
      .balanceOf(account)
      .then((balance: BigNumber) => {
        setBalance(balance);
      })
      .catch(console.error);
  }, [account, sarcophagusTokenContract, currentBlock]);

  return balance;
};

const useSarcoAllowance = (sarcophagusContract: Contract | undefined, sarcophagusTokenContract: Contract | undefined) => {
  const { account } = useWeb3();
  const [allowance, setAllowance] = useState(BigNumber.from(0));

  useEffect(() => {
    if (!account || !sarcophagusContract || !sarcophagusTokenContract) return;
    sarcophagusTokenContract
      .allowance(account, sarcophagusContract?.address)
      .then((allowance: BigNumber) => {
        setAllowance(allowance);
      })
      .catch(console.error);
  }, [account, sarcophagusContract, sarcophagusTokenContract]);
  return allowance;
};

export { useSarcoAllowance, useSarcoBalance };
