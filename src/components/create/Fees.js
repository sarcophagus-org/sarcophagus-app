import React from 'react'
import Error from '../Error'
import Input from '../layout/Input'
import Title from '../layout/Title'

const Fees = ({ values, handleChange, errors, touched }) => (
  <div className="grid grid-cols-2 bg-gray-600 p-8 my-8 border border-gray-500">
    <div className="flex justify-between">
      <div className="flex flex-col" style={{width: '6.875rem'}}>
        <div className="flex">
          <Title type="subTwo" title="Bounty &#x2739;" />
          {errors.bounty && touched.bounty && <Error>{errors.bounty}</Error>}
        </div>
          <Input type="number" height="lg" iPlaceholder="input-placeholder" errored={errors.bounty && touched.bounty} error={errors.bounty} placeholder="100" name="bounty" value={values.bounty} onChange={handleChange}/>
      </div>
      <div className="flex flex-col" style={{width: '6.875rem'}}>
        <div className="flex">
          <Title type="subTwo" title="Digging Fees &#x2739;" />
          {errors.diggingFee && touched.diggingFee && <Error extraPadding="ml-3" >{errors.diggingFee}</Error>}
        </div>
        <Input type="number" height="lg" errored={errors.diggingFee && touched.diggingFee} error={errors.diggingFee} iPlaceholder="input-placeholder" placeholder="10" name="diggingFee" value={values.diggingFee} onChange={handleChange}/>
      </div>
    </div>
  </div>
)

export default Fees