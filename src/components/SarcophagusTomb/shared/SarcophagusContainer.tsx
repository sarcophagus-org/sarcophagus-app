import classnames from "classnames";
import { SarcophagusStatus } from "../tomb.enums";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { formatSarcophagusName, getExpandsionText } from "../tomb.utils";
import arrowRight from "../../../assets/images/arrowRight.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import SarcophagusStatusBadge from "./SarcophagusStatusBadge";
import Tippy from "@tippyjs/react";
import ResurrectionTimer from "./ResurrectionTimer";
import SarcophagusExpandedSection from "./SarcophagusExpandedSection";

interface SarcophagusContainerProps {
  sarcophagus: ISarcophagus;
  isExpandable?: boolean;
  setStatus: (status: SarcophagusStatus) => void;
  isExpanded: boolean;
  isArchived?: boolean;
  status: SarcophagusStatus;
  toggleExpansion: () => void;
}

interface ExpandButtonProps {
  isExpandable?: boolean;
  isExpanded?: boolean;
  status: SarcophagusStatus;
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

const ExpandButton = ({ isExpandable, isExpanded, status }: ExpandButtonProps) => {
  if (!isExpandable || status === SarcophagusStatus.Mining) return null;
  const imageSrc = !isExpanded ? arrowRight : arrowDown;
  const text = getExpandsionText(status);
  return (
    <div className="flex cursor-pointer">
      <img alt="" src={imageSrc} className="mr-2" />
      <span>{text}</span>
    </div>
  );
};

const SarcophagusContainer = ({
  sarcophagus,
  isExpandable,
  toggleExpansion,
  setStatus,
  isExpanded,
  status,
}: SarcophagusContainerProps) => {
  return (
    <div className={Styles.Wrapper}>
      <div
        className={classnames(Styles.Base, { [Styles.Pointer]: isExpandable })}
        onClick={!isExpandable ? () => null : () => toggleExpansion()}
        style={{ height: "4.375rem" }}
      >
        <div className="flex flex-col">
          <SarcophagusName sarcophagus={sarcophagus} />
          <ResurrectionTimer  sarcophagus={sarcophagus}/>
        </div>
        <div className="flex flex-col">
          <ExpandButton isExpandable={isExpandable} isExpanded={isExpanded} status={status} />

          <SarcophagusStatusBadge
            status={status}
            isActive={status === SarcophagusStatus.Active}
          />
        </div>
      </div>
      <SarcophagusExpandedSection
        status={status}
        isExpanded={isExpanded}
        sarcophagus={sarcophagus}
        setStatus={setStatus}
        toggleExpansion={toggleExpansion}
      />
    </div>
  );
};

export default SarcophagusContainer;
