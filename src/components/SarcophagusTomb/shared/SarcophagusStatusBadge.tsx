import Tippy from "@tippyjs/react";
import errorIcon from "../../../assets/images/error.svg";
import classnames from "classnames";
import { Wrapper } from "../../../assets/styles/wrappers.enum";
import { SarcophagusStatus } from "../../../types/sarcophagusTomb";

enum BadgeColor {
  Red = "bg-red",
  Gray = "bg-gray-300",
  Yellow = "bg-yellow",
  Green = "bg-green",
  White = "bg-white",
}

interface StatusBadgeProps {
  status: SarcophagusStatus | string;
  isActive?: boolean;
  isArchived?: boolean;
}

const StatusText = ({ status, isActive, isArchived }: StatusBadgeProps) => {
  switch (status) {
    // archived sarcophagus status
    case SarcophagusStatus.Buried:
      return <div>Buried</div>;
    case SarcophagusStatus.Canceled:
      return <div>Canceled</div>;
    case SarcophagusStatus.Cleaned:
      return <div>Cleaned</div>;
    case SarcophagusStatus.Accused:
      return <div>Accused</div>;
    case SarcophagusStatus.ArchivedUnwrapped:
      return <div>Unwrapped</div>
    case SarcophagusStatus.Archived:
      return <div>Archived</div>
    // arweave statuses
    case SarcophagusStatus.ArweaveMining:
    case SarcophagusStatus.ArweaveUploading:
      return <div>Arweave</div>;
    case SarcophagusStatus.Mining:
      return <div>Mining</div>
    case SarcophagusStatus.Created:
    case SarcophagusStatus.Default:
      return <div>Pending</div>
    case SarcophagusStatus.Unwrapping:
      return <div>Unwrapping</div>
    case SarcophagusStatus.Unwrapped:
      return <div>Unwrapped</div>
    case SarcophagusStatus.Active:
      return <div>Active</div>;
    case SarcophagusStatus.Signing:
      return <div>Signing</div>
    case SarcophagusStatus.WindowClosed:
    case SarcophagusStatus.Error:
    case SarcophagusStatus.PublicKeyUsed:
    case SarcophagusStatus.ArweaveMiningError:
      return (
        <div className="flex items-center">
          <img alt="" src={errorIcon} className="mr-2" />
          <div>Error</div>
        </div>
      );
    default: {
      if (isArchived) return <div>Archived</div>;
      if (isActive) return <div>Active</div>;
      return <div>Pending</div>;
    }
  }
};

const SarcophagusStatusBadge = ({ status, isActive = false, isArchived = false }: StatusBadgeProps) => (
  <Tippy
    content={status}
    className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900"
  >
    <div
      className={classnames(Wrapper.StatusBadge, {
        [BadgeColor.Yellow]:
          !isActive &&
          !isArchived &&
          status !== SarcophagusStatus.Unwrapped &&
          status !== SarcophagusStatus.PublicKeyUsed &&
          status !== SarcophagusStatus.Error &&
          status !== SarcophagusStatus.ArweaveMiningError,
        [BadgeColor.Green]: isActive,
        [BadgeColor.Gray]: isArchived && status !== SarcophagusStatus.Unwrapped,
        [BadgeColor.White]: status === SarcophagusStatus.Unwrapped,
        [BadgeColor.Red]: status === SarcophagusStatus.Error || status === SarcophagusStatus.PublicKeyUsed || status === SarcophagusStatus.ArweaveMiningError,
      })}
      style={{ minWidth: "4.5rem" }}
    >
      <StatusText status={status} isActive={isActive} isArchived={isArchived} />
    </div>
  </Tippy>
);

export default SarcophagusStatusBadge;
