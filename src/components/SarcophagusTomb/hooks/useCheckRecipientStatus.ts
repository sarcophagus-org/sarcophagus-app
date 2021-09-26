import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react'
import { ISarcophagus } from '../../../stores/Sarcophagi/sarcophagi.interfaces'
import { SarcophagusStatus } from '../tomb.enums';


const checkRecipientStatus = (resurrectionTime: BigNumber, resurrectionWindow: BigNumber, privateKey: string, SarcophagusState: number) => {
  const resurrectionTimePlusWindow = resurrectionTime.add(resurrectionWindow);
  const isUnwrapped =
    SarcophagusState === 2 &&
    privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000";
  const isActive =
    SarcophagusState === 1 &&
    resurrectionTimePlusWindow.gte(BigNumber.from(Number(Date.now().valueOf() / 1000).toFixed(0)));
  const isVisible = isUnwrapped || isActive;
  return { isUnwrapped, isActive, isVisible };
};


const useCheckRecipientSarcophagi = (sarcophagus: ISarcophagus) => {
    const [ sarcophagusStatus, setSarcophagusStatus ] = useState<SarcophagusStatus>(SarcophagusStatus.Default)

    useEffect(() => {
        const { isUnwrapped, isActive } = checkRecipientStatus(sarcophagus.resurrectionTime, sarcophagus.resurrectionWindow, sarcophagus.privateKey, sarcophagus.state)
        if (isUnwrapped) {
          setSarcophagusStatus(SarcophagusStatus.Unwrapped)
        }
        else if (sarcophagus?.assetId && isActive){
          setSarcophagusStatus(SarcophagusStatus.Active)
        }
        else if(!sarcophagus?.assetId && isActive){
          setSarcophagusStatus(SarcophagusStatus.Created)
        }
        else if(sarcophagus.state === 2) {
          setSarcophagusStatus(SarcophagusStatus.Archived)
        }
        else {
          // should not see this
          setSarcophagusStatus(SarcophagusStatus.Error)
        }
    }, [ sarcophagus ])

    return { sarcophagusStatus }
}

export default useCheckRecipientSarcophagi