import React from 'react'
import classnames from 'classnames'
import { getDatefromBigNumber } from '../../../utils/datetime';
import { getStorageFee, getDecimalNumber, getCursedPercentage } from '../../../utils/bigNumbers';

const Property = ({label}) => (
  <span className="text-gray-400 mr-2">{ label }</span>
)

const Value = ({value, selected}) => (
  <span className={!selected ? classnames("text-white") : classnames('text-black')}> { value }</span>
)

const ArchaeologistMetrics = ({archaeologist, file, isSelected}) => {
    return (
        <div className="border-t border-gray-500 py-4 px-8 w-full">
          <div className="flex mb-4">
            <span className="text-gray-400 mr-2">Arch </span>
            <span>{archaeologist.address}</span>
          </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="">
                <div className="flex">
                  <Property label="Early Resurrections: " />
                  <Value selected={isSelected} value="" />
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Late | Missed Resurrections: </span>
                  <Value selected={isSelected} value="" />
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Malacious Volume:</span>
                  <Value selected={isSelected} value="" />
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Bounded </span>
                  <Value selected={isSelected} value="" />
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">Percent Cursed:</span>
                  <Value selected={isSelected} value={`${getCursedPercentage(archaeologist.cursedBond, archaeologist.freeBond)}%`} />
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-gray-400 mr-2">Max Resurrection Time:</span>
                  <Value selected={isSelected} value={getDatefromBigNumber(archaeologist.maximumResurrectionTime)} />
                </div>
                <div className="flex">
                  <span className="text-gray-400 mr-2">First Curse</span>
                  <Value selected={isSelected} value="" />
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