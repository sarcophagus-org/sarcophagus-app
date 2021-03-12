import React from 'react'
import Error from '../../Error'
import Input from '../../layout/Input'
import Title from '../../layout/Title'
import { BOUNTY_TOOL_TIP, DIGGING_FEE_TOOL_TIP, FEES_INFO } from '../../../constants'

const Fees = ({ values, handleChange, errors, touched, margin="my-8", paddingRight="md:mr-8", showInfo=true }) => (
  <div className={`flex flex-col md:flex-row gap-4 justify-center md:justify-start w-full bg-gray-600 py-8 md:px-8 ${margin} border border-gray-500 overflow-x-scroll hide-scrollbar`}>
    <div className="flex justify-center flex-wrap sm:flex-nowrap gap-8">
      <div className={`flex flex-col mr-8 ${paddingRight} w-27.5`}>
        <div className="flex flex-col whitespace-nowrap mb-2">
          <Title type="subTwo" title="Bounty &#x2739;" showToolTip={true} toolTip={BOUNTY_TOOL_TIP}/>
          {errors.bounty && touched.bounty && <Error extraPadding="">{errors.bounty}</Error>}
        </div>
          <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.bounty && touched.bounty} error={errors.bounty} placeholder="100" name="bounty" value={values.bounty || ""} onChange={handleChange}/>
      </div>
      <div className="flex flex-col w-27.5">
        <div className="flex flex-col whitespace-nowrap mb-2">
          <Title type="subTwo" title="Digging Fees &#x2739;" showToolTip={true} toolTip={DIGGING_FEE_TOOL_TIP} />
          {errors.diggingFee && touched.diggingFee && <Error extraPadding="" >{errors.diggingFee}</Error>}
        </div>
        <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.diggingFee && touched.diggingFee} error={errors.diggingFee} placeholder="10" name="diggingFee" value={values.diggingFee || ""} onChange={handleChange}/>
      </div>
    </div>
    {showInfo && <div className="text-2xs px-8 text-gray-400 order-first md:order-last md:pt-4">
      { FEES_INFO }
    </div>}
  </div>
)

export default Fees