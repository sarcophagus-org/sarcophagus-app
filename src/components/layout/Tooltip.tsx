import Tippy from "@tippyjs/react";
import question from "../../assets/images/question.svg";

interface TooltipProps {
  content: JSX.Element | string;
  hideTooltip?: boolean;
}

const Tooltip = ({ content, hideTooltip }: TooltipProps) => {
  if (hideTooltip) return null;
  return (
    <Tippy
      content={content}
      className="border-2 border-white rounded text-center text-xs font-normal p-2 bg-gray-900"
    >
      <img src={question} alt="tooltip" />
    </Tippy>
  );
};

export default Tooltip;
