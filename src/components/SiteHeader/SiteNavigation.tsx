import tombIcon from "../../assets/images/tomb.svg";
import sarcophagusIcon from "../../assets/images/sarcophagus.svg";
import eyeOfHorusIcon from "../../assets/images/eyeOfHorus2.svg";
import resurrectionIcon from "../../assets/images/Resurrection.svg";
import LinkWithIcon from "./LinkWithIcon";

const SiteNavigation = () => {
  return (
    <ul className="flex whitespace-nowrap items-center justify-evenly gap-8">
      <li className="">
        <LinkWithIcon dest="/tomb" title="Tomb" icon={tombIcon} />
      </li>
      <li className="">
        <LinkWithIcon dest="/create" title="Create Sarcophagus" icon={sarcophagusIcon} />
      </li>
      <li className="">
        <LinkWithIcon dest="/resurrection" title="Resurrection" icon={resurrectionIcon} />
      </li>
      <li className="">
        <LinkWithIcon dest="/horus" title="Eye of Horus" icon={eyeOfHorusIcon} />
      </li>
    </ul>
  );
};

export default SiteNavigation;
