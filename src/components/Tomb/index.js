import React from 'react'
import Title from '../layout/Title'
import icon from '../../assets/images/tomb.svg'
import SarcophagiList from './SarcophagiList'
import { TOMB_MAIN_CONTENT_PART_1, TOMB_MAIN_CONTENT_PART_2, TOMB_MAIN_CONTENT_LINK } from '../../constants'

const Tomb = () => {
  return (
    <div className="pt-8 px-8 flex justify-center md:justify-between flex-wrap md:flex-nowrap gap-3 md:gap-0">
      <div className="mr-4 w-104">
        <Title type="subOne" icon={icon} title="Tomb" />
        <div className="mt-8 text-md text-white" style={{lineHeight: '1.4375rem'}}>
          <div> { TOMB_MAIN_CONTENT_PART_1 }</div>

          <div className="mt-4">{ TOMB_MAIN_CONTENT_PART_2 } 
          <div className="mt-4" ><a target="_blank" rel="noreferrer noopener" className="cursor-pointer hover:text-gray-300" href="https://github.com/sarcophagus-org/sarcophagus-app/blob/develop/README.md">{ TOMB_MAIN_CONTENT_LINK }</a></div>
          </div>
        </div>
      </div>
      <SarcophagiList />
    </div>
  )
}

export default Tomb