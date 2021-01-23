import React from 'react'
import { truncate } from '../../utils';
import { getStorageFee } from '../../utils/bigNumbers';
import classnames from 'classnames'
import icon from '../../assets/images/icon.svg'
import iconBlack from '../../assets/images/iconBlack.svg'

const base = "grid grid-cols-2 pl-6 text-md"
const baseBorder = "border border-gray-500 text-white bg-gray-600"
const selectedBorder = "border border-white text-black bg-white"

const ArchaeologistsList = ({ archaeologist, file, gtSign, selected, handleSelected, setFieldValue }) => (
  <div onClick={() => {setFieldValue('address', archaeologist.archaeologist); handleSelected(archaeologist, getStorageFee(archaeologist, file, true))}} className={selected === archaeologist.archaeologist ? classnames(base, selectedBorder) : classnames(base, baseBorder)} style={{height: '4.375rem'}}>
    <div className="flex justify-between items-center" style={{lineHeight: '1.44375rem'}}>
      <div className="" style={{width: '6.875rem'}}>{truncate( archaeologist.archaeologist, 20, null)}</div>
      <div style={{width: '6.875rem'}} className="flex items-center" >
        <img src={selected === archaeologist.archaeologist ? iconBlack : icon} alt="" className="inline-block w-4 h-auto mr-2"/>
        {getStorageFee(archaeologist, file)}
      </div>
    </div>
    <div className="grid grid-cols-2">
      <div></div>
      <div className="grid grid-cols-2 items-center">
        <div></div>
        <div className="" style={{width: 'fit-content'}}>
          {gtSign} <u>Metrics</u>
        </div>
      </div>
    </div>
  </div>
)

export default ArchaeologistsList