import React from 'react'
import Error from '../../Error'
import Input from '../../layout/Input'
import Title from '../../layout/Title'

const bountyTip = "Max Bounty. Paid to the Archaeologist for a successful resurrection (keep default unless adv user)"
const diggingFeeTip = "Max Digging Fees. Your Paid to the archaeologist after re-wrap (keep default unless adv user)"

const Fees = ({ values, handleChange, errors, touched, margin="my-8" }) => (
  <div className={`flex w-full bg-gray-600 py-8 px-8 md:px-12 ${margin} border border-gray-500 overflow-x-scroll hide-scrollbar`}>
    <div className="flex justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-8">
      <div className="flex flex-col md:mr-24" style={{width: '6.875rem'}}>
        <div className="flex md:mr-24">
          <Title type="subTwo" title="Bounty &#x2739;" showToolTip={true} toolTip={bountyTip}/>
          {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
        </div>
          <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.bounty && touched.bounty} error={errors.bounty} placeholder="100" name="bounty" value={values.bounty || ""} onChange={handleChange}/>
      </div>
      <div className="flex flex-col md:mr-24" style={{width: '6.875rem'}}>
        <div className="flex">
          <Title type="subTwo" title="Digging Fees &#x2739;" showToolTip={true} toolTip={diggingFeeTip} />
          {errors.diggingFee && touched.diggingFee && <Error extraPadding="ml-3" >{errors.diggingFee}</Error>}
        </div>
        <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.diggingFee && touched.diggingFee} error={errors.diggingFee} placeholder="10" name="diggingFee" value={values.diggingFee || ""} onChange={handleChange}/>
      </div>
    </div>
  </div>
)

export default Fees