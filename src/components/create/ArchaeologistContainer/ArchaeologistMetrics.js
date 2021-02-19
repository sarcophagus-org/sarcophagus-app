import React from 'react'
import { getDatefromBigNumber } from '../../../utils/datetime';
import { getStorageFee, getDecimalNumber, getCursedPercentage } from '../../../utils/bigNumbers';
const ArchaeologistMetrics = ({archaeologist, file}) => {
    return (
        <div className="border-t border-gray-500 py-4 px-8 w-full">
          <div className="flex mb-4">
            <span className="text-gray-400 mr-2">Arch </span>
            <span>{archaeologist.paymentAddress}</span>
          </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="">
                <div className="flex">
                  <span className="text-gray-400 mr-2">Early Resurrections: </span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Late | Missed Resurrections: </span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Malacious Volume:</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Bounded </span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Percent Cursed:</span>
                  <span className="text-white">{getCursedPercentage(archaeologist.cursedBond, archaeologist.freeBond)}%</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-gray-400 mr-2">Max Resurrection Time:</span>
                  <span className="text-white">{getDatefromBigNumber(archaeologist.maximumResurrectionTime)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">First Curse</span>
                  <span className="text-white"></span>
                </div>
              </div>
              <div> 
                <div className="flex">
                  <span className="text-gray-400 mr-2">Min Digging Fee:</span>
                  <span className="text-white">{getDecimalNumber(archaeologist.minimumDiggingFee, 18)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Min Bounty:</span>
                  <span className="text-white">{getDecimalNumber(archaeologist.minimumBounty, 18)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Fee per byte:</span>
                  <span className="text-white">{getDecimalNumber(archaeologist.feePerByte, 18)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Total Storage Fee</span>
                  <span className="text-white">{getStorageFee(archaeologist , file)}</span>
                </div>
              </div>
            </div>
        </div>
    )
}

export default ArchaeologistMetrics