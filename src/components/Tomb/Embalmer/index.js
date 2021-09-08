import { connect } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { useWeb3 } from "../../../web3";
import { useSarcophagiData } from "../../Context/SarcophagiContext";
import MockSarcophagus from "../MockSarcophagus";
import PendingSarcophagus from "./PendingSarcophagus";
import SarcophagusWrapper from "./SarcophagusWrapper";

const Embalmer = ({ refresh }) => {
  const history = useHistory();
  const { account } = useWeb3();
  const { embalmerSarcophagi, pendingSarcophagi } = useSarcophagiData();

  if (!account) {
    return (
      <MockSarcophagus
        message="Connect to a wallet to get started"
        handleClick={() => connect()}
      />
    );
  }

  if (account && !embalmerSarcophagi.length && !pendingSarcophagi.length) {
    return (
      <MockSarcophagus
        message="Create sarcophagus"
        handleClick={() => history.push("/create")}
      />
    );
  }

  return (
    <>
      {pendingSarcophagi?.map((sarcophagus, i) => (
        <PendingSarcophagus
          sarcophagus={sarcophagus}
          key={sarcophagus?.archaeologist + i.toString()}
        />
      ))}
      {embalmerSarcophagi?.map((sarcophagus, i) => (
        <SarcophagusWrapper
          key={sarcophagus.archaeologist + i.toString()}
          sarcophagus={sarcophagus}
          refresh={refresh}
        />
      ))}
    </>
  );
};

export default Embalmer;
