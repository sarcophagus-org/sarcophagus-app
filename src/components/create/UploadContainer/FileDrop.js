import React, { useEffect } from 'react'
import FileDropzone from '../../Dropzone'
import Error from '../../Error'
import InfoBox from '../../layout/InfoBox'
import SectionContainer from '../../layout/SectionContainer'
import Title from '../../layout/Title'
import TwoColumnContainer from '../../layout/TwoColumnContainer'
import arrowDown from '../../../assets/images/arrowDown.svg'
import { FILE_UPLOAD_INFO } from '../../../constants'

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
        <div className="flex items-center">
          <Title type="subTwo" title="Attach File" />
          {errors.fileUploaded && touched.fileUploaded && <Error>{errors.fileUploaded}</Error>}
        </div>
        <TwoColumnContainer>
          <FileDropzone errors={errors.fileUploaded && touched.fileUploaded} handleFile={handleFile} style={{height: '10.625rem'}} file={file}/>
          <InfoBox margin="-mt-1">
            {FILE_UPLOAD_INFO}
          </InfoBox>
        </TwoColumnContainer>
      </div>
    </SectionContainer>
  )
}
export default FileDrop