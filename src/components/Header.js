import React  from 'react'
import logo from '../assets/images/logo.png'
import wallet from '../assets/images/wallet.svg'
import { useUserSuppliedConnect, connect } from '../web3/userSupplied'

const AccountDisplay = ({ account }) => {
  const { userSupplied } = useUserSuppliedConnect()

  const truncate = (fullStr, strLen, separator) => {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    const sepLen = separator.length
    const charsToShow = strLen - sepLen
    const frontChars = Math.ceil(charsToShow / 2 + 1) // accounts for the "0x"
    const backChars = Math.floor(charsToShow / 2 - 1) // accounts for the "0x"

    return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
  }

  if (account) {
    return (
      <div>
        {truncate(account, 25)}
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

const Top = () => {
  const { userSupplied } = useUserSuppliedConnect()

  return (
    <div className="flex justify-between mb-16">
      <div className="w-24 p-1">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex items-center">
        <div>
          <img src={wallet} alt="wallet" />
        </div>
        <div className="ml-3 text-gray-400 text-sm">
          <AccountDisplay account={userSupplied.account} />
        </div>
      </div>
    </div>
  )
}

const Tabs = () => {
  return (
    <ul className="flex">
      <li className="px-4 py-1 border border-solid">Create</li>
      <li className="px-4 py-1 border border-solid">ReWrap</li>
      <li className="px-4 py-1 border border-solid">Resurrect</li>
      <li className="px-4 py-1 border border-solid">Tomb</li>
    </ul>
  )
}



const Header = () => {
  return (
    <div className="pt-2 pb-6">
      <Top />
      <Tabs />
    </div>
  )
}

export default Header