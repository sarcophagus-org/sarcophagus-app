import { ethers } from "ethers";
import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

const useTransaction = () => {
  const [pending, setPending] = useState(false);

  const contractCall = useCallback(
    (
      contractFn: () => Promise<ethers.ContractTransaction>,
      pendingMessage: string,
      broadcastCallback: () => void,
      failedMessage: string,
      successMessage: string,
      failedCallback?: () => void,
      successCallback?: (txRecipient: { transactionHash: string }) => void,
      completedCallback?: () => void
    ) => {
      let toastId: React.ReactText;
      setPending(true);
      contractFn()
        .then((txResponse: ethers.ContractTransaction) => {
          toastId = toast.dark(pendingMessage, {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
          });
          const wait =
            process.env.NODE_ENV !== "development"
              ? 0
              : process.env.REACT_APP_DEVELOPMENT_TX_WAIT_MS
              ? parseInt(process.env.REACT_APP_DEVELOPMENT_TX_WAIT_MS)
              : 0;
          broadcastCallback(); // -> broadcastCallback()
          return Promise.all([
            new Promise((resolve) => setTimeout(() => resolve(null), wait)).then(() => txResponse.wait()),
            toastId,
          ]);
        })
        .then(([txReceipt, toastId]) => {
          setTimeout(() => {
            setPending(false);
          }, 5000);
          toast.dismiss(toastId);
          if (txReceipt.status === 0) {
            toast.error(failedMessage);
            if (failedCallback) failedCallback();
          } else if (txReceipt.status === 1) {
            toast.dark(successMessage);
            if (successCallback) successCallback(txReceipt);
          } else {
            toast.error("Not sure what happened with that transaction");
            if (failedCallback) failedCallback();
          }
          if (completedCallback) completedCallback();
        })
        .catch((error: ProviderRpcError) => {
          console.error(error);
          setPending(false);
          toast.dismiss(toastId);
          if (error.code !== 4001) {
            toast.error("There was an error! Check your browser's console logs for more details.");
          }
          if (failedCallback) failedCallback();
        });
    },
    []
  );

  return { contractCall, pending };
};

export { useTransaction };
