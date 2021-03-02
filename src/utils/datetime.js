import { makeNumeral } from "./bigNumbers"
import {BigNumber} from "ethers";

const convertToUTC = date => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )
}

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
  const timeZoneOffset = today.getTimezoneOffset()
  today.setDate(today.getDate() + numDays)
  today.setMinutes(today.getMinutes() + timeZoneOffset)
  const utc = convertToUTC(today)
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
  const offset = time.getTimezoneOffset()
  time.setMinutes(time.getMinutes() + offset)
  return `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`
}

const getCustomDateUTC = (utc) => {
  const date = new Date(utc)
  const offset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offset)
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
  const timeZoneOffset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() +  timeZoneOffset)
  const zonedUTC = convertToUTCTime(date)
  return BigNumber.from(zonedUTC / 1000)
}

export { convertToUTC, getUTCDate, getDatefromBigNumber, getCustomDateUTC, getTimeRemaining, getCustomDate, isTimePast, formatCustomResurrectionTime }
