import { utils } from "ethers"

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

const getUTCDate = numDays => {
  let today = new Date()
  today.setDate(today.getDate() + numDays)
  const utc = convertToUTC(today)
  return utc
}

const getDate = maximumResurrectionTime => {
  return new Date(Number(utils.formatUnits(maximumResurrectionTime, 'wei')).toFixed(0))
}

const getCustomDateUTC = (days=0, hours=0, minutes=0) => {
  let today = new Date()
  today.setDate(today.getDate() + days)
  today.setHours(today.getHours() + hours)
  today.setMinutes(today.getMinutes() + minutes)
  const utc = convertToUTC(today)
  return utc
}

const getTimeRemaining = (endtime) => {
  const total = endtime - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return `${days} days ${hours}:${minutes}:${seconds}`
}

export { convertToUTC, getUTCDate, getDate, getCustomDateUTC, getTimeRemaining }
