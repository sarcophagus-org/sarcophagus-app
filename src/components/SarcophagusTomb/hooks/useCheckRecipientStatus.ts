import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { Sarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../../../types/sarcophagusTomb";

const checkRecipientStatus = (
  resurrectionTime: BigNumber,
  resurrectionWindow: BigNumber,
  privateKey: string,
  SarcophagusState: number
) => {
  // calculates total time till resurrection is complete
  const resurrectionTimePlusWindow = resurrectionTime.add(resurrectionWindow);

  // check if sarcophagus has been updated
  const isUnwrapped =
    SarcophagusState === 2 &&
    privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000";
  // check if sarcophagus is currently active
  const isActive =
    SarcophagusState === 1 &&
    resurrectionTimePlusWindow.gte(BigNumber.from(Number(Date.now().valueOf() / 1000).toFixed(0)));

  // shows active and unwrapped sarcophagi
  const isVisible = isUnwrapped || isActive;
  return { isUnwrapped, isActive, isVisible };
};

const useCheckRecipientSarcophagi = (sarcophagus: Sarcophagus) => {
  const [sarcophagusStatus, setSarcophagusStatus] = useState<SarcophagusStatus>(SarcophagusStatus.Default);

  useEffect(() => {
    const { isUnwrapped, isActive } = checkRecipientStatus(
      sarcophagus.resurrectionTime,
      sarcophagus.resurrectionWindow,
      sarcophagus.privateKey,
      sarcophagus.state
    );
    if (isUnwrapped) {
      setSarcophagusStatus(SarcophagusStatus.Unwrapped);
    } else if (isActive) {
      const sarcoStatus = sarcophagus?.assetId ? SarcophagusStatus.Active : SarcophagusStatus.Created;
      setSarcophagusStatus(sarcoStatus);
    } else if (sarcophagus.state === 2) {
      setSarcophagusStatus(SarcophagusStatus.Archived);
    } else {
      // should not see this
      setSarcophagusStatus(SarcophagusStatus.Error);
    }
  }, [sarcophagus]);

  return { sarcophagusStatus };
};

export default useCheckRecipientSarcophagi;
