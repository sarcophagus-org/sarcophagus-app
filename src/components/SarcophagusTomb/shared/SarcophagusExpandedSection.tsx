import { ethers } from "ethers";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { ISarcophagus, ISarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import Button from "../../layout/Button";
import Tooltip from "../../layout/Tooltip";
import { SarcophagusStatus } from "../tomb.enums";
import ResurrectionForm from "./ResurrectionForm";
import Rewrap from "./Rewrap";

interface SarcophagusExpandedSectionProps {
  status: SarcophagusStatus;
  sarcophagus: ISarcophagus;
  isExpanded: boolean;
  setStatus: (status: SarcophagusStatus) => void;
  toggleExpansion: () => void;
}

interface SectionContainerProps {
  text: string;
  tooltipContent: string;
  action: () => void;
  signButton?: JSX.Element;
}

const SectionContainer = ({ text, tooltipContent, action, signButton }: SectionContainerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8" style={{ height: "12.0625rem" }}>
      {signButton && signButton}
      <div className="whitespace-nowrap flex underline cursor-pointer" onClick={action}>
        <span className="mr-2">{text}</span>
        <Tooltip content={tooltipContent} />
      </div>
    </div>
  );
};

const SarcophagusExpandedSection = ({
  sarcophagus,
  status,
  setStatus,
  toggleExpansion,
  isExpanded,
}: SarcophagusExpandedSectionProps) => {
  const sarcophagiStore: ISarcophagusStore = useSarcophagiStore();

  const cancelSarcophagus = async () => {
    const { AssetDoubleHash } = sarcophagus;
    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));
    const success = await sarcophagiStore.cancelSarcophagus(buffedAssetDoubleHash, setStatus);
    if (success) {
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
    }
  };

  const cleanSarcophagus = async () => {
    const { AssetDoubleHash, archaeologist } = sarcophagus;
    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));
    const success = await sarcophagiStore.cleanSarcophagus(buffedAssetDoubleHash, archaeologist, setStatus);
    if (success) {
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
    }
  };

  const updateSarcophagus = async () => {
    const success = await sarcophagiStore.updateSarcophagus(setStatus);
    if (success) {
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
    }
  };

  if (!isExpanded) return null;

  switch (status) {
    case SarcophagusStatus.ArweaveMining:
    case SarcophagusStatus.ArweaveUploading:
    case SarcophagusStatus.Mining:
    case SarcophagusStatus.Created:
    case SarcophagusStatus.Buried:
    case SarcophagusStatus.Canceled:
    case SarcophagusStatus.Cleaned:
    case SarcophagusStatus.Default:
    case SarcophagusStatus.Unwrapping:
      return null;
    case SarcophagusStatus.Unwrapped:
      return <ResurrectionForm sarcophagus={sarcophagus} />;
    case SarcophagusStatus.Active:
      // allows user to rewrap
      return <Rewrap sarcophagus={sarcophagus} setStatus={setStatus} toggleExpansion={toggleExpansion} />;
    case SarcophagusStatus.Signing:
      // allows user to sign transaction and update sarcophagus
      return (
        <SectionContainer
          text="Cancel this sarcophagus"
          tooltipContent="Canceling a sarcophagus, transfers the bounty and storage fee back, transfers the digging fee to the archaeologist, and archives sarcophagus."
          action={cancelSarcophagus}
          signButton={<Button type="button" onClick={updateSarcophagus} label="Sign" />}
        />
      );
    case SarcophagusStatus.WindowClosed:
      // allows user to clean;
      return (
        <SectionContainer
          text="Clean this sarcophagus"
          tooltipContent="Cleaning a sarcophagus, rewards embalmer with the cursed bond, and refunds the rest of the payment (bounty and digging fees) back to embalmer and archives sarcophagus."
          action={cleanSarcophagus}
        />
      );
    case SarcophagusStatus.Error:
    case SarcophagusStatus.PublicKeyUsed:
      // allows users to cancel
      return (
        <SectionContainer
          text="Cancel this sarcophagus"
          tooltipContent="Canceling a sarcophagus, transfers the bounty and storage fee back, transfers the digging fee to the archaeologist, and archives sarcophagus."
          action={cancelSarcophagus}
        />
      );
  }
};

export default SarcophagusExpandedSection;
