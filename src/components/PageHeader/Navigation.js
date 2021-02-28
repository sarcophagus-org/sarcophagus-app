import React from 'react'
import NavLink from './NavLink'
import tombIcon from '../../assets/images/tomb.svg'
import sarcophagusIcon from '../../assets/images/sarcophagus.svg'
import eyeOfHorusIcon from '../../assets/images/eyeOfHorus2.svg'
import resurrectionIcon from '../../assets/images/Resurrection.svg'

const Navigation = () => {
  return (
    <ul className="flex whitespace-nowrap">
      <li className="pr-4 py-1 ">
        <NavLink dest="/tomb" title="Tomb" icon={tombIcon}/>
      </li>
      <li className="px-4 py-1 ">
        <NavLink dest="/create" title="Create Sarcophagus" icon={sarcophagusIcon}/>
      </li>
      <li className="px-4 py-1 ">
        <NavLink dest="/resurrection" title="Resurrection" icon={resurrectionIcon}/>
      </li>
      <li className="px-4 py-1 ">
        <NavLink dest="/horus" title="Eye of Horus" icon={eyeOfHorusIcon}/>
      </li>
    </ul>
  )
}
export default Navigation