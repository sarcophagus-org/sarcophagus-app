import Transaction from "arweave/node/lib/transaction";
import { useState, useCallback, ReactText } from "react";
import { toast } from "react-toastify";

const useTransaction = () => {
  const [pending, setPending] = useState(false);

  const contractCall = useCallback(
    (
      contractFn,
      parameters,
      pendingMessage,
      pendingCallback,
      failedMessage,
      successMessage,
      successCallback,
      completedCallback
    ) => {
      setPending(true);
      let toastId: ReactText;
      contractFn(...parameters)
        .then((txResponse: Transaction) => {
          pendingCallback();
          toastId = toast.dark(pendingMessage, {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
          });
          return Promise.all([txResponse.wait(), toastId]);
        })
        .then(([txReceipt, toastId]: any[]) => {
          setPending(false);
          toast.dismiss(toastId);
          if (txReceipt.status === 0) {
            toast.error(failedMessage);
          } else if (txReceipt.status === 1) {
            toast.success(successMessage);
            if (successCallback) successCallback(txReceipt);
          } else {
            toast.error("Not sure what happened with that transaction");
          }
          if (completedCallback) completedCallback();
        })
        .catch((error: Error) => {
          console.error(error);
          setPending(false);
          toast.dismiss(toastId);
          toast.error("There was an error! Check your browser's console logs for more details.");
        });
    },
    []
  );

  return { contractCall, pending };
};

export { useTransaction };
