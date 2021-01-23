import React  from 'react'
import logo from '../assets/images/logo.png'
import wallet from '../assets/images/wallet.svg'
import { truncate } from '../utils'
import { useWeb3 } from '../web3'
import { connect } from '../web3/userSupplied'
import icon from '../assets/images/icon.svg'
import NavLink from './nav/NavLink'

const AccountDisplay = () => {
  const { account } = useWeb3()

  if (account) {
    return (
      <div className="flex justify-center items-center">
        {truncate(account, 25)}
        <img src={icon} alt="" className="ml-6" />
      </div>
    )
  } else {
    return (
      <button className="underline" onClick={() => connect()}>
        Connect Web3 Account
      </button>
    )
  }
}

const Tabs = () => {
  return (
    <ul className="flex">
      <li className="pr-4 py-1 ">
        <NavLink dest="/" title="My Tomb" />
      </li>
      <li className="px-4 py-1 ">
        <NavLink dest="/create" title="Create" />
      </li>
      <li className="px-4 py-1 ">
        <NavLink dest="/resurrect" title="Resurrect" />
      </li>
    </ul>
  )
}

const Top = () =>  (
  <div className="flex justify-between items-center mb-16" style={{height: '4rem'}}>
    <div className="flex items-center">
      <div className="w-10 p-1 mr-4">
        <img src={logo} alt="logo" />
      </div>
      <Tabs />
    </div>
    <div className="flex items-center">
      <div>
        <img src={wallet} alt="wallet" className="" />
      </div>
      <div className="ml-3 text-sm text-gray-300">
        <AccountDisplay />
      </div>
    </div>
  </div>
)





const Header = () => {
  return (
    <div className="pt-2">
      <Top />
    </div>
  )
}

export default Header