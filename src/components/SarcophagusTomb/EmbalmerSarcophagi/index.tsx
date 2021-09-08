import { useHistory } from "react-router-dom";
import { ClientRoutes } from "../../../config/clientRoutes";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { ISarcophagus, ISarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { useWeb3 } from "../../../web3";
import { connect } from "../../../web3/providers";
import SarcophagusContainer from "../shared/SarcophagusContainer";
import { SarcophagusStatus } from "../tomb.enums";

const EmbalmerSarcophagus = ({ sarcophagus }: { sarcophagus: ISarcophagus }) => {
  return (
    <SarcophagusContainer
      status={SarcophagusStatus.Active}
      error={""}
      toggleExpansion={() => null}
      sarcophagus={sarcophagus}
      isExpandable={true}
      isExpanded={false}
    />
  );
};

const EmbalmerSarcophagi = () => {
  const sarcophagiStore: ISarcophagusStore = useSarcophagiStore();
  const { account } = useWeb3();
  const history = useHistory();
  if (!sarcophagiStore.isSarcophagiLoaded) {
    return <div>...</div>;
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
  // todo add && !pendingSarcophagi.length
  if (account && !sarcophagiStore.embalmerSarcophagi.length) {
    <div
      className="border border-gray-500 hover:border-white text-white text-md flex justify-center items-center cursor-pointer max-w-128"
      onClick={() => history.push(ClientRoutes.Create)}
      style={{ height: "4.375rem" }}
    >
      Create a Sarcophagus
    </div>;
  }
  return (
    <div>
      {sarcophagiStore.embalmerSarcophagi.map((sarcophagus: ISarcophagus, index: number) => (
        <EmbalmerSarcophagus key={sarcophagus.name + index} sarcophagus={sarcophagus} />
      ))}
    </div>
  );
};

export default EmbalmerSarcophagi;