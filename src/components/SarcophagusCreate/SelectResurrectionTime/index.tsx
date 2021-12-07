import { useEffect } from "react";
import useCollapse from "../hooks/useCollapsed";
import SectionContainer from "../shared/SectionContainer";
import clock from "../../../assets/images/clock.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import ResurrectionTimeForm from "../../shared/ResurrectionForm/ResurrectionTimeForm";
import { SelectResurrectionProps } from "../../../types/sarcophagusCreate";

const SelectResurrectionTime = ({ values, errors, ...rest }: SelectResurrectionProps) => {
  const { collapsed, toggle, open } = useCollapse();

  useEffect(() => {
    if (values.fileUploaded) {
      if (!errors.fileUploaded) {
        open();
      }
    }
  }, [open, errors, values]);

  if (!collapsed) {
    return (
      <SectionContainer addClasses="cursor-pointer">
        <div className="flex justify-between">
          <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2 mb-8">
            <img src={clock} alt="" className="mr-4" />
            <span className="text-md font-bold">Set resurrection time</span>
          </div>
          <img alt="" src={arrowDown} onClick={toggle} />
        </div>
        <div className="md:grid md:grid-cols-2 mt-8 md:gap-6">
          <ResurrectionTimeForm values={values} errors={errors} {...rest} />
          <div className="text-gray-400 text-2xs">
            <div className="pb-4 leading-5">
              The resurrection is the exact date and time that the outer layer of your Sarcophagus will be
              decrypted by the archaeologist.
            </div>
            <div className="pb-4 leading-5">
              If you don’t attest before this time; only the inner layer controlled by the recipient is
              protecting the data.
            </div>
            <div className="pb-4 leading-5">
              The further you set the resurrection time, the more it will cost.
            </div>
          </div>
        </div>
      </SectionContainer>
    );
  } else {
    return (
      <SectionContainer transition={false} addClasses="cursor-pointer" onClick={toggle}>
        <div className="flex justify-between">
          <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
            <img src={clock} alt="" className="mr-4" />
            <span className="text-md font-bold">Set resurrection time</span>
          </div>
          <img className="" alt="" src={arrowRight} />
        </div>
      </SectionContainer>
    );
  }
};

export default SelectResurrectionTime;
