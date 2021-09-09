import Button from "../../layout/Button";
import Tooltip from "../../layout/Tooltip";
import { SarcophagusStatus } from "../tomb.enums";

interface SarcophagusExpandedSectionProps {
  status: SarcophagusStatus;
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

const SarcophagusExpandedSection = ({ status }: SarcophagusExpandedSectionProps) => {
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
    case SarcophagusStatus.Unwrapped:
      return null;
    case SarcophagusStatus.Active:
      // allows user to rewrap
      return <div></div>;
    case SarcophagusStatus.Signing:
      // allows user to sign transaction and update sarcophagus
      return (
        <SectionContainer
          text="Sign Message"
          tooltipContent="Signing"
          action={() => null}
          signButton={
            <Button type="button" onClick={() => null} label="Sign" />
          }
        />
      );
    case SarcophagusStatus.WindowClosed:
      // allows user to clean;
      return (
        <SectionContainer
          text="Clean this sarcophagus"
          tooltipContent="Cleaning a sarcophagus, rewards embalmer with the cursed bond, and refunds the rest of the payment (bounty and digging fees) back to embalmer and archives sarcophagus."
          action={() => null}
        />
      );
    case SarcophagusStatus.Error:
      // allows users to cancel
      return (
        <SectionContainer
          text="Cancel this sarcophagus"
          tooltipContent="Canceling a sarcophagus, transfers the bounty and storage fee back, transfers the digging fee to the archaeologist, and archives sarcophagus."
          action={() => null}
        />
      );
  }
};

export default SarcophagusExpandedSection;
