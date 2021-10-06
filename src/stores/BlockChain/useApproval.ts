import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useBlockChainStore } from ".";
import { useTransaction } from "./useTransaction";

const useApproval = () => {
  const { allowance, balance, sarcophagusContract, sarcophagusTokenContract } = useBlockChainStore();
  const { contractCall } = useTransaction();
  const [approved, setApproved] = useState(false);

  const approveTransaction = useCallback(async () => {
    const successCallback = ({ transactionHash }: { transactionHash: string }) => {
      toast.success("SARCO approval made!");
      console.info("Approval TX HASH", transactionHash);
      setApproved(true);
    };

    contractCall(
      () =>
        sarcophagusTokenContract.approve(
          sarcophagusContract?.address,
          BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1))
        ),
      "Approving SARCO...",
      () => null,
      "SARCO approval failed!",
      "SARCO approval made!",
      undefined,
      successCallback
    );
  }, [sarcophagusContract?.address, sarcophagusTokenContract, contractCall]);

  useEffect(() => {
    if(approved) return
    if (allowance.gte(balance)) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  }, [balance, allowance, approved]);

  return { approved, approveTransaction };
};

export default useApproval;
