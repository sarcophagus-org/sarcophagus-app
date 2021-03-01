import { useEffect, useState } from 'react'

const useArchivedSarcophagi = ( embalmerAllSarcophagi, recipientAllSarcophagi ) => {
  const [ archivedSarcophagi, setArchivedSarcophagi ] = useState([])

  useEffect(() => {
    // filters all sarcophagi for account for state of 2
    const inactiveEmbalmerSarcophagi = embalmerAllSarcophagi.filter(v => v.state === 2)
    const inactiveRecipientSarcophagi = recipientAllSarcophagi.filter(v => v.state === 2)
    // merged into single array
    const mergedSarcophagi = [...inactiveEmbalmerSarcophagi, ...inactiveRecipientSarcophagi]
    // creates a new array filtering out the duplicates
    const filteredSarcophagi = Array.from(mergedSarcophagi.reduce((acc, item) => (item && item["AssetDoubleHash"] && acc.set(item["AssetDoubleHash"], item)), new Map()).values())
    setArchivedSarcophagi(filteredSarcophagi)
  }, [ embalmerAllSarcophagi, recipientAllSarcophagi ])


  return { archivedSarcophagi }
}

export { useArchivedSarcophagi }