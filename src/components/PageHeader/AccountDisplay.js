import React from 'react'
import { truncate } from '../../utils'
import { useWeb3 } from '../../web3'
import icon from '../../assets/images/icon.svg'
import { connect } from '../../web3/userSupplied'

const AccountDisplay = () => {
    const { account } = useWeb3()

    if (account) {
        return (
        <div className="flex justify-center items-center w-full">
            {truncate(account, 19, '...', 7)}
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

export default AccountDisplay