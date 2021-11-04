import { useEffect } from "react";
import { Sarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { useResurrectionTimer } from "../hooks/useResurrectionTimers";
import { SarcophagusStatus, TimerStatus } from "../tomb.enums";

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

const ResurrectionTimer = ({
  sarcophagus,
  status,
}: {
  sarcophagus: Sarcophagus;
  status: SarcophagusStatus;
}) => {
  const resurrectionTimerState = useResurrectionTimer(sarcophagus);
  const isStateTwo = sarcophagus.state === 2;

  useEffect(() => {
    switch(status) {
      case SarcophagusStatus.Mining:
        resurrectionTimerState.refreshTimers();
        break;
      default:
        // do nothing
    }
  }, [resurrectionTimerState, status]);

  // if sarcophagus is state of 2 or time is provided remove timer
  if (isStateTwo || !sarcophagus.resurrectionTime) return null;
  // decides text color of timer
  const textColor = getTextColor(resurrectionTimerState.timerStatus);
  if (resurrectionTimerState.timerStatus === TimerStatus.Off) return null;

  return (
    <div className={`text-sm ${textColor}`} style={{ lineHeight: "1.0625rem" }}>
      {`Resurrection: ${resurrectionTimerState.currentTimeTillResurrection}`}
    </div>
  );
};

export default ResurrectionTimer;
