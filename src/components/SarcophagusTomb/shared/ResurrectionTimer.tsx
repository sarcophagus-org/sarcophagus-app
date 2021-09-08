import { TimerStatus } from "../tomb.enums";
interface ResurrectionTimerProps {
  timerStatus: TimerStatus;
  currentTimeTillResurrection: string;
}

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

const ResurrectionTimer = ({ timerStatus, currentTimeTillResurrection }: ResurrectionTimerProps) => {
  const textColor = getTextColor(timerStatus);
  if (timerStatus === TimerStatus.Off) return null;
  return (
    <div className={`text-sm ${textColor}`} style={{ lineHeight: "1.0625rem" }}>
      {`Resurrection: ${currentTimeTillResurrection}`}
    </div>
  );
};
export default ResurrectionTimer;
