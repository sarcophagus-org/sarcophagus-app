import { useEffect } from "react";
import upload from "../../../assets/images/upload.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import SarcophagusFileUpload from "./SarcophagusFileUpload";
import SectionContainer from "../shared/SectionContainer";
import useCollapse from "../hooks/useCollapsed";
import { UploadSarcophagusFileProps } from "../../../types/sarcophagusCreate";

const UploadSarcophagusFile = ({ values, errors, ...rest }: UploadSarcophagusFileProps) => {
  const { collapsed, toggle, open } = useCollapse();

  useEffect(() => {
    if (values.name && values.recipientPublicKey) {
      if (!errors.name && !errors.recipientPublicKey) {
        open();
      }
    }
  }, [open, errors, values]);
  if (!collapsed) {
    return <SarcophagusFileUpload values={values} toggle={toggle} errors={errors} {...rest} />;
  } else {
    return (
      <SectionContainer transition={false} addClasses="cursor-pointer" onClick={toggle}>
        <div className="flex justify-between">
          <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
            <img src={upload} alt="" className="mr-4" />
            <span className="text-md font-bold">Upload your file to your sarcophagus</span>
          </div>
          <img className="" alt="" src={arrowRight} />
        </div>
      </SectionContainer>
    );
  }
};

export default UploadSarcophagusFile;
