import { useEffect, useState } from 'react'

const useSarcophagi = ( embalmerAllSarcophagi, recipientAllSarcophagi ) => {
  const [ embalmerSarcophagi, setEmbalmerSarcophagi ] = useState([])
  const [ recipientSarcophagi, setRecipientSarcophagi ] = useState([])
  const [ overSarcophagi, setOverSarcophagi ] = useState([])

  useEffect(() => {
    const activeEmbalmerSarcophagi = embalmerAllSarcophagi.filter(v => v.state === 1)
    setEmbalmerSarcophagi(activeEmbalmerSarcophagi)
  }, [ embalmerAllSarcophagi ])

  useEffect(() => {
    const activeRecipientSarcophagi = recipientAllSarcophagi.filter(v => v.state === 1)
    setRecipientSarcophagi(activeRecipientSarcophagi)
  }, [ recipientAllSarcophagi ])

  useEffect(() => {
    // filters all sarcophagi for account for state of 2
    const inactiveEmbalmerSarcophagi = embalmerAllSarcophagi.filter(v => v.state === 2)
    const inactiveRecipientSarcophagi = recipientAllSarcophagi.filter(v => v.state === 2)
    // merged into single array
    const mergedSarcophagi = [...inactiveEmbalmerSarcophagi, ...inactiveRecipientSarcophagi]
    // creates a new array filtering out the duplicates
    const filteredSarcophagi = Array.from(mergedSarcophagi.reduce((acc, item) => (item && item["AssetDoubleHash"] && acc.set(item["AssetDoubleHash"], item)), new Map()).values())
    setOverSarcophagi(filteredSarcophagi)
  }, [ embalmerAllSarcophagi, recipientAllSarcophagi ])


  return { embalmerSarcophagi, recipientSarcophagi, overSarcophagi }
}

export { useSarcophagi }