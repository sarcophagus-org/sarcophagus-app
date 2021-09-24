import { useState, useEffect, useCallback, useRef } from "react";
import { ISarcophagus } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import { TimerStatus } from "../tomb.enums";
import { UseResurrectionTimerState } from "../tomb.interfaces";
import { getTimeRemaining } from "../tomb.utils";

const useResurrectionTimer = (sarcophagus: ISarcophagus): UseResurrectionTimerState => {
  const TimerIntervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.Calculating);
  const [resurrectionTime] = useState(sarcophagus.resurrectionTime);
  const [resurrectionWindow] = useState(sarcophagus.resurrectionWindow);
  const [currentTimeTillResurrection, setCurrentTimeTillResurrection] = useState<string>("");
  const ResurrectionTimeUTCSeconds =
    sarcophagus.state !== 2 && sarcophagus.resurrectionTime ? resurrectionTime.toNumber() : 0;
  const ResurrectionWindowUTCSeconds =
    sarcophagus.state !== 2 && sarcophagus.resurrectionWindow ? resurrectionWindow.toNumber() : 0;
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
    timerInit();
    return () => clearInterval(TimerIntervalRef.current as NodeJS.Timeout);
  }, [timerInit]);

  return { timerStatus, currentTimeTillResurrection, refreshTimers };
};

export { useResurrectionTimer };
