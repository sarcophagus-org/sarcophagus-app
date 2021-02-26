import React  from 'react'
import logo from '../assets/images/logo.png'
import wallet from '../assets/images/wallet.svg'
import { truncate } from '../utils'
import { useWeb3 } from '../web3'
import { connect } from '../web3/userSupplied'
import icon from '../assets/images/icon.svg'
import NavLink from './nav/NavLink'
import tombIcon from '../assets/images/tomb.svg'
import sarcophagusIcon from '../assets/images/sarcophagus.svg'
import eyeOfHorusIcon from '../assets/images/eyeOfHorus2.svg'
import resurrectionIcon from '../assets/images/AtefCrown.svg'

const AccountDisplay = () => {
  const { account } = useWeb3()

  if (account) {
    return (
      <div className="flex justify-center items-center w-full">
        {truncate(account, 25)}
        <img src={icon} alt="" className="ml-6" />
      </div>
    )
  } else {
    return (
      <button className="underline text-center w-full" onClick={() => connect()}>
        Connect Web3 Account
      </button>
    )
  }
}

const Tabs = () => {
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

const Top = () =>  (
  <div className="flex items-center flex-wrap" style={{height: '4rem'}}>
    <div className="w-24 p-1 mr-4">
      <img src={logo} alt="logo" />
    </div>

    <div className="flex items-center w-full justify-center md:-mt-4">
      <div className="">
        <Tabs />
      </div>
    </div>

    <div className="flex items-center justify-center absolute right-0" style={{top: '2rem'}}>
      <div>
        <img src={wallet} alt="wallet" className="" />
      </div>
      <div className="ml-3 text-sm text-gray-300 ">
        <AccountDisplay />
      </div>
    </div>

  </div>
)


const Header = () => {
  return (
    <div className="mt-6 mb-16 relative">
      <Top />
    </div>
  )
}

export default Header