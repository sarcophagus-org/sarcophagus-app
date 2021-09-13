import icon from "../../../assets/images/name.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import SectionContainer from "../shared/SectionContainer";
import { SettingsProps } from "../sarcophagusCreate.interfaces";
import NameAndRecipientSettings from "./NameAndRecipientSetting";
import useCollapse from "../hooks/useCollapsed";


const Settings = (props: SettingsProps) => {
  const { collapsed, toggle } = useCollapse(false, true);

  if (!collapsed) {
    return <NameAndRecipientSettings toggle={toggle} {...props} />;
  }
  return (
    <SectionContainer transition={false} addClasses="cursor-pointer" onClick={toggle}>
      <div className="flex justify-between">
        <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
          <img src={icon} alt="" className="mr-4" />
          <span className="text-md font-bold">Name Sarcophagus and add recipient</span>
        </div>
        <img className="" alt="" src={arrowRight} />
      </div>
    </SectionContainer>
  );
};

export default Settings;
