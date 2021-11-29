import { useState, useEffect, useCallback, useRef } from "react";
import { Sarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { TimerStatus } from "../tomb.enums";
import { UseResurrectionTimerState } from "../tomb.interfaces";
import { getTimeRemaining } from "../tomb.utils";

const useResurrectionTimer = (sarcophagus: Sarcophagus): UseResurrectionTimerState => {
  const TimerIntervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.Calculating);
  const [resurrectionTime, setTime] = useState(sarcophagus.resurrectionTime);
  const [resurrectionWindow, setWindow] = useState(sarcophagus.resurrectionWindow);
  const [currentTimeTillResurrection, setCurrentTimeTillResurrection] = useState<string>("");

  // returns resurrection time as UTC number in seconds
  const ResurrectionTimeUTCSeconds =
  sarcophagus.state !== 2 && sarcophagus.resurrectionTime ? resurrectionTime.toNumber() : 0;
  // returns resurrection window as UTC number in seconds
  const ResurrectionWindowUTCSeconds =
    sarcophagus.state !== 2 && sarcophagus.resurrectionWindow ? resurrectionWindow.toNumber() : 0;
  // calculates total time until resurrection is complete in milli seconds
  const TimePlusWindowUTCMilli = (ResurrectionTimeUTCSeconds + ResurrectionWindowUTCSeconds) * 1000;
  const isPastWindow = TimePlusWindowUTCMilli - Date.now().valueOf() <= 0;
  const isWithinWindow = TimePlusWindowUTCMilli - Date.now().valueOf() <= 0;

  const refreshTimers = () => {
    setTimerStatus(TimerStatus.Calculating);
    setCurrentTimeTillResurrection("");
    clearInterval(TimerIntervalRef.current as NodeJS.Timeout);
  };

  const startTimer = useCallback(() => {
    TimerIntervalRef.current = setInterval(() => {
      // decides which timer to set
      const currentWindowTime = isWithinWindow ? TimePlusWindowUTCMilli : ResurrectionTimeUTCSeconds * 1000;
      const remainingTime = getTimeRemaining(currentWindowTime);
      setCurrentTimeTillResurrection(remainingTime);
    }, 1000);
  }, [TimePlusWindowUTCMilli, isWithinWindow, ResurrectionTimeUTCSeconds]);

  const timerInit = useCallback(() => {
    if (isPastWindow) {
      setTimerStatus(TimerStatus.Close);
      clearInterval(TimerIntervalRef.current as NodeJS.Timeout);
      return;
    } else if (isWithinWindow) {
      setTimerStatus(TimerStatus.Unwrapping);
    } else {
      setTimerStatus(TimerStatus.Active);
    }
    startTimer();
  }, [isPastWindow, isWithinWindow, startTimer]);

  useEffect(() => {
    setTime(sarcophagus.resurrectionTime)
    setWindow(sarcophagus.resurrectionWindow)
    timerInit();
    return () => clearInterval(TimerIntervalRef.current as NodeJS.Timeout);
  }, [timerInit, sarcophagus]);

  return { timerStatus, currentTimeTillResurrection, refreshTimers };
};

export { useResurrectionTimer };
