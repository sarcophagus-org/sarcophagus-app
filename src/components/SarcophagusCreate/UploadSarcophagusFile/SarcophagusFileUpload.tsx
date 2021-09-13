import { useEffect } from "react";
import InfoBox from "../../layout/InfoBox";
import arrowDown from "../../../assets/images/arrowDown.svg";
import { FILE_UPLOAD_INFO_1, FILE_UPLOAD_INFO_2 } from "../../../constants";
import { UploadSarcophagusFileProps } from "../sarcophagusCreate.interfaces";
import upload from "../../../assets/images/upload.svg";
import SectionContainer from "../shared/SectionContainer";
import ErrorText from "../../layout/ErrorText";
import FileDropzone from "./FileDropZone";

const SarcophagusFileUpload = ({
  handleFile,
  file,
  setFieldValue,
  errors,
  handleBlur,
  touched,
  toggle,
}: UploadSarcophagusFileProps) => {
  useEffect(() => {
    if (!file) return;
    setFieldValue("fileUploaded", file);
  }, [file, setFieldValue]);
  return (
    <SectionContainer>
      <div className="flex justify-between">
        <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
          <img src={upload} alt="" className="mr-4" />
          <span className="text-md font-bold">Upload your file to your sarcophagus</span>
        </div>
        <img alt="" src={arrowDown} onClick={toggle} />
      </div>
      <div className="mt-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="mr-2 text-gray-400 text-sm whitespace-nowrap" style={{ lineHeight: "1.375rem" }}>
              Attach File
            </span>
          </div>
          <ErrorText isVisible={!!errors.fileUploaded && !!touched.fileUploaded} text={errors.fileUploaded} />
        </div>
        <div className="md:grid md:grid-cols-2 mt-8 md:gap-6">
          <FileDropzone
            handleFile={handleFile}
            file={file}
            handleBlur={handleBlur}
          />
          <InfoBox margin="-mt-1">
            <div className="leading-5">{FILE_UPLOAD_INFO_1}</div>
            <div className="leading-5 my-4">{FILE_UPLOAD_INFO_2}</div>
          </InfoBox>
        </div>
      </div>
    </SectionContainer>
  );
};
export default SarcophagusFileUpload;
