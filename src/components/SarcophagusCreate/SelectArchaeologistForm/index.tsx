import { useEffect } from "react";
import useCollapse from "../../customHooks/useCollapse";
import pickaxe from "../../../assets/images/pickaxe.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import SectionContainer from "../shared/SectionContainer";
import FeesForm from "../../shared/FeesForm";
import { SelectArchaeologistProps } from "../sarcophagusCreate.interfaces";
import ArchaeologistSelect from "../ArchaeologistSelect";

const ArchaeologistSelectForm = ({ values, errors, ...rest }: SelectArchaeologistProps) => {
  const { collapsed, toggle, open } = useCollapse();

  useEffect(() => {
    if (values.resurrectionTime) {
      if (!errors.resurrectionTime) {
        open();
      }
    }
  }, [open, errors, values]);

  if (!collapsed) {
    return (
      <SectionContainer>
        <div className="flex justify-between">
          <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
            <img src={pickaxe} alt="" className="mr-4" />
            <span className="text-md font-bold">Pick an Archaeologist</span>
          </div>
          <img className="" alt="" src={arrowRight} onClick={toggle} />
        </div>
        <FeesForm values={values} errors={errors} isDescriptionShown={true} {...rest} />
        <ArchaeologistSelect values={values} errors={errors} {...rest} />
      </SectionContainer>
    );
  } else {
    return (
      <SectionContainer transition={false} addClasses="cursor-pointer" onClick={toggle}>
        <div className="flex justify-between">
          <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
            <img src={pickaxe} alt="" className="mr-4" />
            <span className="text-md font-bold">Pick an Archaeologist</span>
          </div>
          <img className="" alt="" src={arrowRight} />
        </div>
      </SectionContainer>
    );
  }
};

export default ArchaeologistSelectForm;
