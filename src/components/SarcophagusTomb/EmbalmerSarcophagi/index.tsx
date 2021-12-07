import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ClientRoutes } from "../../../config/clientRoutes";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { Sarcophagus, SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { SarcophagusStatus } from "../../../types/sarcophagusTomb";
import { useWeb3 } from "../../../web3";
import { connect } from "../../../web3/providers";
import Loader from "../../shared/Loader";
import useCheckStatus from "../hooks/useCheckEmbalmerStatus";
import SarcophagusContainer from "../shared/SarcophagusContainer";
import { getExpansionText } from "../tomb.utils";

const EmbalmerSarcophagus = ({ sarcophagus }: { sarcophagus: Sarcophagus }) => {
  const { sarcophagusStatus, updateStatus, checkStatus } = useCheckStatus(sarcophagus);
  const [isExpanded, setIsExpanded] = useState(false);
  checkStatus();

  return (
    <SarcophagusContainer
      status={sarcophagusStatus}
      setStatus={updateStatus}
      toggleExpansion={() => setIsExpanded((expanded: boolean) => !expanded)}
      sarcophagus={sarcophagus}
      isExpandable={!!getExpansionText(sarcophagusStatus)}
      isExpanded={isExpanded}
    />
  );
};

const PendingSarcophagus = ({ sarcophagus }: { sarcophagus: Sarcophagus }) => {
  return (
    <SarcophagusContainer
      status={SarcophagusStatus.Mining}
      setStatus={() => null}
      toggleExpansion={() => null}
      sarcophagus={sarcophagus}
      isExpandable={false}
      isExpanded={false}
    />
  );
};

const EmbalmerSarcophagi = () => {
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  const { account } = useWeb3();
  const history = useHistory();

  const noSarcophagusLoaded =
    !!account && !sarcophagiStore.embalmerSarcophagi.length && !sarcophagiStore.pendingSarcophagi.length;

  if (!sarcophagiStore.isSarcophagiLoaded) {
    return <Loader />;
  }

  if (!account) {
    return (
      <div
        className="border border-gray-500 hover:border-white text-white text-md flex justify-center items-center cursor-pointer max-w-128"
        onClick={connect}
        style={{ height: "4.375rem" }}
      >
        Connect to a wallet to get started
      </div>
    );
  }

  if (noSarcophagusLoaded) {
    return (
      <div
        className="border border-gray-500 hover:border-white text-white text-md flex justify-center items-center cursor-pointer max-w-128"
        onClick={() => history.push(ClientRoutes.Create)}
        style={{ height: "4.375rem" }}
      >
        Create a Sarcophagus
      </div>
    );
  }

  
  return (
    <div>
      {sarcophagiStore.pendingSarcophagi.map((sarcophagus: Sarcophagus, index: number) => (
        <PendingSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
      {sarcophagiStore.embalmerSarcophagi.map((sarcophagus: Sarcophagus, index: number) => (
        <EmbalmerSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default EmbalmerSarcophagi;
