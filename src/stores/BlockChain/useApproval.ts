import { BigNumber, ethers } from "ethers";
import { ReactText, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useBlockChainStore } from ".";

const useApproval = () => {
  const { allowance, balance, sarcophagusContract, sarcophagusTokenContract } = useBlockChainStore();
  const [approved, setApproved] = useState(false);

  const approveTransaction = useCallback(async () => {
    let toastId: ReactText;
    sarcophagusTokenContract
      .approve(
        sarcophagusContract?.address,
        BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1))
      )
      .then((txResponse: ethers.ContractTransaction) => {
        toastId = toast.info("Approving SARCO...", {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
        });
        return Promise.all([txResponse.wait(), toastId]);
      })
      .then(([txReceipt, toastId]: any) => {
        toast.dismiss(toastId);
        if (txReceipt.status === 0) {
          toast.error("SARCO approval failed!");
        } else if (txReceipt.status === 1) {
          toast.success("SARCO approval made!");
          console.info("Approval TX HASH", txReceipt.transactionHash);
          setApproved(true);
        } else {
          toast.error("Not sure what happened with that transaction");
        }
      })
      .catch((error: any) => {
        console.error(error);
        toast.dismiss(toastId);
        toast.error("There was an error! Check your browser's console logs for more details.");
      });
  }, [sarcophagusContract?.address, sarcophagusTokenContract]);

  useEffect(() => {
    if (allowance.lt(balance)) {
      setApproved(false);
    } else {
      setApproved(true);
    }
  }, [approveTransaction, balance, allowance]);

  return { approved, approveTransaction };
};

export default useApproval;