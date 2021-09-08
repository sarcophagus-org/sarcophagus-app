import { TimerStatus } from "./tomb.enums";

export interface UseCheckStatusState {

}

export interface CreatedSarcophagusData {

}

export interface UseRessurectionTimerState {
  timerStatus: TimerStatus;
  currentTimeTillResurrection: string;
  refreshTimers: () => void;
}

