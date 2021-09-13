import sarcophagusIcon from "../../../assets/images/sarcophagus.svg";
import SectionContainer from "../shared/SectionContainer";

const CreateTitleAndDescription = () => {
  return (
    <SectionContainer transition={false}>
      <div className="flex items-center mb-6 whitespace-nowrap">
        <img src={sarcophagusIcon} alt="" className="mr-4" />
        <span className="text-lg">Create Sarcophagus</span>
      </div>
      <div className="text-md font-normal">
        This is where you create a Sarcophagus, a process we call “embalming.” Name your Sarcophagus, paste
        the full public key of the recipient and upload the file you wish to embalm.
      </div>
    </SectionContainer>
  );
};

export default CreateTitleAndDescription;
