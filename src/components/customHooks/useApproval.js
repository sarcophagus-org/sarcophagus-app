import { BigNumber } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useData } from "../BlockChainContext"

const useApproval = () => {
    const { allowance, balance, sarcophagusContract, sarcophagusTokenContract } = useData()
    const [ approved, setApproved ] = useState(false)

    const approveTransaction = useCallback(async () => {
        const txReceipt = await sarcophagusTokenContract.approve(sarcophagusContract?.address, BigNumber.from(2).pow(BigNumber.from(256)).sub(BigNumber.from(1)))
        console.log('Tx Receipt ~', txReceipt)
        toast.dark('Signing Approved, click finish to continue')
        setApproved(true)
      }, [sarcophagusContract?.address, sarcophagusTokenContract])

    useEffect(() => {
        if(allowance.lt(balance)) {
            setApproved(false)
        } else {
            setApproved(true)
        }
    }, [ approveTransaction, balance, allowance ])

    return { approved, approveTransaction }
}

export default useApproval
