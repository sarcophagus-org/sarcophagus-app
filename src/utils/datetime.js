import { makeNumeral } from "./bigNumbers"
import {BigNumber} from "ethers";

const convertToUTCTime = date => {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )
}

const getUTCDate = numDays => {
  let today = new Date()
  today.setDate(today.getDate() + numDays)
  const utc = convertToUTCTime(today)
  return utc
}

const getDatefromBigNumber = UtcBN => {
  const UTC = makeNumeral(UtcBN, 0).value() * 1000
  const dateFromUTC = new Date(UTC)
  const timeZoneOffset = dateFromUTC.getTimezoneOffset()
  dateFromUTC.setMinutes(dateFromUTC.getMinutes() + timeZoneOffset)
  return `${dateFromUTC.toLocaleDateString()} ${dateFromUTC.toLocaleTimeString()}`
}

const getCustomDate = (utc) => {
  if(!utc) return '00/00/0000 0:00:00 AM'
  const time = new Date(utc)
  return `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`
}

const getCustomDateUTC = (utc) => {
  const date = new Date(utc)
  return date
}

const getTimeRemaining = (endtime) => {
  const total = endtime - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return `${days} days ${covertToTwoDigitString(hours)}:${covertToTwoDigitString(minutes)}:${covertToTwoDigitString(seconds)}`
}

const isTimePast = (time, window) => {
  const UTCTime = makeNumeral(time, 0).value() * 1000
  const UTCWindow= makeNumeral(window, 0).value() * 1000
  return Math.sign((UTCTime + UTCWindow) - Date.now().valueOf() <= 0)
}

const covertToTwoDigitString = (num) => {
  return num < 10 ? `0${num}` : num
}

const formatCustomResurrectionTime = (resurrectionTime) => {
  const date = new Date(resurrectionTime)
  const zonedUTC = convertToUTCTime(date)
  return BigNumber.from(zonedUTC / 1000)
}

export { getUTCDate, getDatefromBigNumber, getCustomDateUTC, getTimeRemaining, getCustomDate, isTimePast, formatCustomResurrectionTime, convertToUTCTime }
