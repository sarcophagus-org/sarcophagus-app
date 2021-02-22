import React, { useEffect } from 'react'
import FileDropzone from '../../Dropzone'
import Error from '../../Error'
import InfoBox from '../../layout/InfoBox'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import arrowDown from '../../../assets/images/arrowDown.svg'

const FileDrop = ({handleFile, file, setFieldValue, errors, touched, icon, toggle, title}) => {
  useEffect(() => {
    if(!file) return
    setFieldValue('fileUploaded', file)
  }, [file, setFieldValue])
  return (
    <SectionContainer>
      <div className="flex justify-between">
        <Title type="subOne" title={title} icon={icon} />
        <img alt="" src={arrowDown} onClick={toggle} />
      </div>
      <div className="mt-8">
        <div className="flex">
          <Title type="subTwo" title="Attach File" />
          {errors.fileUploaded && touched.fileUploaded && <Error>{errors.fileUploaded}</Error>}
        </div>
        <TwoColumnContainer>
          <FileDropzone errors={errors.fileUploaded && touched.fileUploaded} handleFile={handleFile} style={{height: '10.625rem'}} file={file}/>
          <InfoBox margin="-mt-1">
            Upload the file that you wish to embalm. This file will be downloaded exactly as it is after resurrection. Current alpha max file size: 2.5mb
          </InfoBox>
        </TwoColumnContainer>
      </div>
    </SectionContainer>
  )
}
export default FileDrop