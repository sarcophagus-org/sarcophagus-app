import React from 'react'
import Error from '../../Error'
import Input from '../../layout/Input'
import Title from '../../layout/Title'

const bountyTip = "Max Bounty. Paid to the Archaeologist for a successful resurrection (keep default unless adv user)"
const diggingFeeTip = "Max Digging Fees. Your Paid to the archaeologist after re-wrap (keep default unless adv user)"

const Fees = ({ values, handleChange, errors, touched, margin="my-8", paddingRight="md:mr-8", showInfo=true }) => (
  <div className={`flex flex-col md:flex-row gap-4 justify-center md:justify-start w-full bg-gray-600 py-8 md:px-8 ${margin} border border-gray-500 overflow-x-scroll hide-scrollbar`}>
    <div className="flex justify-center flex-wrap sm:flex-nowrap gap-8">
      <div className={`flex flex-col mr-8 ${paddingRight} w-27.5`}>
        <div className="flex flex-col whitespace-nowrap mb-2">
          <Title type="subTwo" title="Bounty &#x2739;" showToolTip={true} toolTip={bountyTip}/>
          {errors.bounty && touched.bounty && <Error extraPadding="">{errors.bounty}</Error>}
        </div>
          <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.bounty && touched.bounty} error={errors.bounty} placeholder="100" name="bounty" value={values.bounty || ""} onChange={handleChange}/>
      </div>
      <div className="flex flex-col w-27.5">
        <div className="flex flex-col whitespace-nowrap mb-2">
          <Title type="subTwo" title="Digging Fees &#x2739;" showToolTip={true} toolTip={diggingFeeTip} />
          {errors.diggingFee && touched.diggingFee && <Error extraPadding="" >{errors.diggingFee}</Error>}
        </div>
        <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.diggingFee && touched.diggingFee} error={errors.diggingFee} placeholder="10" name="diggingFee" value={values.diggingFee || ""} onChange={handleChange}/>
      </div>
    </div>
    {showInfo && <div className="text-2xs px-8 text-gray-400 order-first md:order-last md:pt-4">
      Archaeologists are sorted by their mininum fees. When an archaeologist is selected, the mininum fees will be set to these fields. To increase fees offered to an archaeologist, enter new fees after selecting an archaeologist
    </div>}
  </div>
)

export default Fees