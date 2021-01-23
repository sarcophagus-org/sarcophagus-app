import React, { useEffect } from 'react'
import { labels } from '../../constants'
import FileDropzone from '../Dropzone'
import Error from '../Error'
import InfoBox from '../layout/InfoBox'
import SectionContainer from '../layout/SectionContainer'
import Title from '../layout/Title'
import TwoColumnContainer from '../layout/TwoColumnContainer'

const FileDrop = ({handleFile, file, setFieldValue, errors, touched}) => {
  useEffect(() => {
    if(!file) return
    setFieldValue('fileUploaded', file)
  }, [file, setFieldValue])
  return (
    <SectionContainer>
      <Title type="subOne" title={labels.fileUpload} />
      <div className="mt-8">
        <div className="flex">
          <Title type="subTwo" title="Attach File &#x2739;" />
          {errors.fileUploaded && touched.fileUploaded && <Error>{errors.fileUploaded}</Error>}
        </div>
        <TwoColumnContainer>
          <FileDropzone errors={errors.fileUploaded && touched.fileUploaded} handleFile={handleFile} style={{height: '10.625rem'}} file={file}/>
          <InfoBox>
            Helper text here can explain something and have space for a link to learn more
          </InfoBox>
        </TwoColumnContainer>
      </div>
    </SectionContainer>
  )
}
export default FileDrop