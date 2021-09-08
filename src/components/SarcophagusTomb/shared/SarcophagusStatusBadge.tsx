import Tippy from "@tippyjs/react";
import errorIcon from "../../../assets/images/error.svg";
import classnames from "classnames";
import { Wrapper } from "../../../assets/styles/wrappers.enum";
import { SarcophagusStatus } from "../tomb.enums";

enum BadgeColor {
  Red = "bg-red",
  Gray = "bg-gray-300",
  Yellow = "bg-yellow",
  Green = "bg-green",
  White = "bg-white",
}

interface StatusBadgeProps {
  status: SarcophagusStatus | string;
  hasError: boolean;
  isActive?: boolean;
  isArchived?: boolean;
}

const StatusText = ({ hasError, status, isActive, isArchived }: StatusBadgeProps) => {
  if (hasError) {
    return (
      <div className="flex items-center">
        <img alt="" src={errorIcon} className="mr-2" />
        <div className="leading-4">Error</div>
      </div>
    );
  }
  if (status === SarcophagusStatus.Unwrapped) return <div>UnWrapped</div>;
  if (isActive) return <div>Active</div>;
  if (isArchived) return <div>Archived</div>;
  return <div>Pending</div>;
};

const SarcophagusStatusBadge = ({ status, hasError, isActive = false, isArchived = false }: StatusBadgeProps) => (
  <Tippy
    content={status}
    className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900"
  >
    <div
      className={classnames(Wrapper.StatusBadge, {
        [BadgeColor.Red]: !!hasError,
        [BadgeColor.White]: status === SarcophagusStatus.Unwrapped,
        [BadgeColor.Green]: isActive,
        [BadgeColor.Gray]: isArchived,
        [BadgeColor.Yellow]: !hasError && !isActive && !isArchived && status !== SarcophagusStatus.Unwrapped,
      })}
      style={{ width: "fit-content" }}
    >
      <StatusText status={status} hasError={hasError} isActive={isActive} />
    </div>
  </Tippy>
);

export default SarcophagusStatusBadge;
