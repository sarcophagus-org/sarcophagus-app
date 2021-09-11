import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { useResurrectionTimer } from "../hooks/useResurrectionTimers";
import { TimerStatus } from "../tomb.enums";

const getTextColor = (timerStatus: TimerStatus) => {
  switch (timerStatus) {
    case TimerStatus.Active:
    case TimerStatus.Calculating:
      return "text-gray-400";
    case TimerStatus.Unwrapping:
      return "text-yellow";
    case TimerStatus.Off:
      return "";
    case TimerStatus.Close:
      return "text-red";
  }
};

const ResurrectionTimer = ({ sarcophagus }: { sarcophagus: ISarcophagus }) => {
  const resurrectionTimerState = useResurrectionTimer(sarcophagus);
  const isStateTwo = sarcophagus.state === 2;
  if (isStateTwo) return null;
  const textColor = getTextColor(resurrectionTimerState.timerStatus);
  if (resurrectionTimerState.timerStatus === TimerStatus.Off) return null;
  return (
    <div className={`text-sm ${textColor}`} style={{ lineHeight: "1.0625rem" }}>
      {`Resurrection: ${resurrectionTimerState.currentTimeTillResurrection}`}
    </div>
  );
};
export default ResurrectionTimer;
