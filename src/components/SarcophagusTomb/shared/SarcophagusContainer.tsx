import classnames from "classnames";
import { SarcophagusStatus } from "../tomb.enums";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { formatSarcophagusName, getExpandsionText } from "../tomb.utils";
import arrowRight from "../../../assets/images/arrowRight.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import SarcophagusStatusBadge from "./SarcophagusStatusBadge";
import Tippy from "@tippyjs/react";

interface SarcophagusContainerProps {
  sarcophagus: ISarcophagus;
  isExpandable?: boolean;
  isExpanded?: boolean;
  isArchived?: boolean;
  status: SarcophagusStatus;
  toggleExpansion: () => void;
  error: string;
}

interface ExpandButtonProps {
  isExpandable?: boolean;
  isExpanded?: boolean;
  status: SarcophagusStatus;
  error: string;
}

enum Styles {
  Base = "text-white text-md flex justify-between relative cursor-default max-w-128",
  Pointer = "cursor-pointer",
  Wrapper = "border border-gray-500 px-4 my-8 pt-3",
}

const SarcophagusName = (props: { sarcophagus: ISarcophagus }) => {
  return (
    <Tippy content={props.sarcophagus.name} disabled={props.sarcophagus.name.length < 30}>
      <div className="text-base font-bold text-white" style={{ lineHeight: "1.625rem" }}>
        {formatSarcophagusName(props.sarcophagus.name)}
      </div>
    </Tippy>
  );
};

const ExpandButton = ({ isExpandable, isExpanded, status, error }: ExpandButtonProps) => {
  if (!isExpandable || status === SarcophagusStatus.Mining) return null;
  const imageSrc = !isExpanded ? arrowRight : arrowDown;
  const text = getExpandsionText(status, error);
  return (
    <div className="flex cursor-pointer">
      <img alt="" src={imageSrc} className="mr-2" /><span>{text}</span>
    </div>
  );
};

const SarcophagusContainer = ({
  sarcophagus,
  isExpandable,
  toggleExpansion,
  isExpanded,
  status,
  error,
}: SarcophagusContainerProps) => {
  return (
    <div className={Styles.Wrapper}>
      <div
        className={classnames(Styles.Base, { [Styles.Pointer]: isExpandable })}
        onClick={!isExpandable ? () => null : () => toggleExpansion()}
        style={{ height: "4.375rem" }}
      >
        <SarcophagusName sarcophagus={sarcophagus} />
        {/* <ResurrectionTimer timer={timer} color={color} timers={timers} /> */}

        <div className="flex flex-col">
          <ExpandButton isExpandable={isExpandable} isExpanded={isExpanded} status={status} error={error} />

          <SarcophagusStatusBadge
            status={error || status}
            hasError={!!error || status === SarcophagusStatus.Closed}
            isActive={status === SarcophagusStatus.Active}
          />
        </div>
      </div>
      {/* todo add expanded */}
    </div>
  );
};

export default SarcophagusContainer;
