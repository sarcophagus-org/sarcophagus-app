import { ethers } from "ethers";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { Sarcophagus, SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import Button from "../../layout/Button";
import Tooltip from "../../layout/Tooltip";
import { SarcophagusStatus } from "../tomb.enums";
import ResurrectionForm from "../../shared/ResurrectionForm";
import Rewrap from "./Rewrap";
import { ArchaeologistsStore } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { useArchaeologistsStore } from "../../../stores/Archaeologist";

interface SarcophagusExpandedSectionProps {
  status: SarcophagusStatus;
  sarcophagus: Sarcophagus;
  isExpanded: boolean;
  setStatus: (status: SarcophagusStatus) => void;
  toggleExpansion: () => void;
  recipientPrivateKey?: string;
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
  recipientPrivateKey,
}: SarcophagusExpandedSectionProps) => {
  const sarcophagiStore: SarcophagusStore = useSarcophagiStore();
  const archaeologistsStore: ArchaeologistsStore = useArchaeologistsStore();

  const cancelSarcophagus = () => {
    const { AssetDoubleHash } = sarcophagus;
    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));

    const successRefresh = ({ transactionHash }: { transactionHash: string }) => {
      console.info("Cancel transaction hash:", transactionHash);
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
      archaeologistsStore.loadArchaeologists();
    };

    sarcophagiStore.cancelSarcophagus(buffedAssetDoubleHash, setStatus, successRefresh);
  };

  const cleanSarcophagus = () => {
    const { AssetDoubleHash, archaeologist } = sarcophagus;
    const buffedAssetDoubleHash = Buffer.from(ethers.utils.arrayify(AssetDoubleHash));
    const successRefresh = () => {
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
      archaeologistsStore.loadArchaeologists();
    };
    sarcophagiStore.cleanSarcophagus(buffedAssetDoubleHash, archaeologist, setStatus, successRefresh);
  };

  const updateSarcophagus = () => {
    const successRefresh = () => {
      toggleExpansion();
      sarcophagiStore.loadSarcophagi();
      archaeologistsStore.loadArchaeologists();
    };
    sarcophagiStore.updateSarcophagus(setStatus, successRefresh);
  };

  if (!isExpanded) return null;

  switch (status) {
    case SarcophagusStatus.Accused:
    case SarcophagusStatus.ArweaveMining:
    case SarcophagusStatus.ArweaveUploading:
    case SarcophagusStatus.ArchivedUnwrapped:
    case SarcophagusStatus.Mining:
    case SarcophagusStatus.Created:
    case SarcophagusStatus.Buried:
    case SarcophagusStatus.Canceled:
    case SarcophagusStatus.Cleaned:
    case SarcophagusStatus.Default:
    case SarcophagusStatus.Unwrapping:
    case SarcophagusStatus.Archived:
      return null;
    case SarcophagusStatus.Unwrapped:
      return <ResurrectionForm sarcophagus={sarcophagus} recipientPrivateKey={recipientPrivateKey} />;
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
    case SarcophagusStatus.ArweaveMiningError:
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
