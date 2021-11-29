import classnames from "classnames";
import { ethers } from "ethers";
import { Archaeologist } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { SelectArchaeologistProps } from "../sarcophagusCreate.interfaces";
import { isMaxResurrectionTimeValid } from '../../shared/components.utils'
import useCollapse from "../hooks/useCollapsed";
import { archTotalFees, getDecimalNumber, getNumberalString, truncate } from "../../shared/components.utils";
import ArchaeologistData from "./ArchaeologistData";
import iconDark from "../../../assets/images/iconBlack.svg";
import iconLight from "../../../assets/images/icon.svg";
import arrowRightBlack from "../../../assets/images/arrowRightBlack.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import arrowDownBlack from "../../../assets/images/arrowDownBlack.svg";

interface ArchaeologistTableRowProps extends SelectArchaeologistProps {
  archaeologist: Archaeologist;
  file: File | null;
}

enum TableRowStyles {
  Default = "border border-gray-500 text-white bg-gray-600 cursor-pointer",
  Selected = "border border-white text-black bg-white cursor-pointer",
  Disabled = "border border-gray-500 text-gray-500 cursor-default"
}

const ArchaeolgistTableRow = ({
  archaeologist,
  file,
  setFieldValue,
  handleSelected,
  values,
}: ArchaeologistTableRowProps) => {
  const { collapsed, toggle } = useCollapse(true, true);

  const isSelected = values.address === archaeologist.address;
  // calculates total fees
  const archTotal = archTotalFees(archaeologist, file).toString();
  // checks bounty and digging fee values are higher than inputed values
  const isBountyLess = archaeologist.minimumBounty.lte(ethers.utils.parseEther(values.bounty.toString()));
  const isDiggingFeeLess = archaeologist.minimumDiggingFee.lte(
    ethers.utils.parseEther(values.diggingFee.toString())
  );
  const isArchaeologistMaxResValid = isMaxResurrectionTimeValid(archaeologist.maximumResurrectionTime.toNumber(), Number(values.resurrectionTime))

  const isDisabled = !isBountyLess || !isDiggingFeeLess || !isArchaeologistMaxResValid;
  // checks freebond is greater
  const isFreeBondGreater = archaeologist.freeBond.gte(ethers.utils.parseEther(archTotal));
  
  const selectArchaeologist = () => {
    if(isSelected) {
      setFieldValue("bounty", "1")
      setFieldValue("diggingFee", 6)
      setFieldValue("address", "")
      return
    }
    if(isDisabled) return
    setFieldValue("bounty", getNumberalString(archaeologist.minimumBounty, 18));
    setFieldValue("diggingFee", getNumberalString(archaeologist.minimumDiggingFee, 18));
    setFieldValue("address", archaeologist.address);
    handleSelected(archaeologist, archTotal);
  };

  if (!archaeologist?.isOnline || !isFreeBondGreater) {
    return null;
  }
  return (
    <div
      className={classnames(
        "flex flex-col",
        { [TableRowStyles.Default]: !isSelected && !isDisabled},
        { [TableRowStyles.Selected]: isSelected },
        { [TableRowStyles.Disabled]: isDisabled},
        { "order-12": isDisabled },
        { "order-0": !isDisabled }
      )}
      onClick={selectArchaeologist}
    >
      <div className="flex flex-grow arch-table-row">
        <div className="flex items-center">{truncate(archaeologist.address, 18)}</div>
        <div className="flex items-center">
          <img
            src={values.address === archaeologist.address ? iconDark : iconLight}
            alt=""
            className="inline-block w-4 h-auto mr-2"
          />
          {archTotalFees(archaeologist, file)}
        </div>
        <div className="flex items-center">
          <img
            src={values.address === archaeologist.address ? iconDark : iconLight}
            alt=""
            className="inline-block w-4 h-auto mr-2"
          />
          {getDecimalNumber(archaeologist?.minimumBounty, 18)}
        </div>
        <div className="flex items-center">
          <img
            src={values.address === archaeologist.address ? iconDark : iconLight}
            alt=""
            className="inline-block w-4 h-auto mr-2"
          />

          {getDecimalNumber(archaeologist?.minimumDiggingFee, 18)}
        </div>
        <div
          className="flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          {isSelected && collapsed && <img alt="" src={arrowRightBlack} className="mr-2" />}
          {isSelected && !collapsed && <img alt="" src={arrowDownBlack} className="mr-2" />}
          {!isSelected && collapsed && <img alt="" src={arrowRight} className="mr-2" />}
          {!isSelected && !collapsed && <img alt="" src={arrowDown} className="mr-2" />}
          <u>Metrics</u>
        </div>
      </div>
      <ArchaeologistData
        archaeologist={archaeologist}
        file={file}
        isSelected={isSelected}
        open={!collapsed}
      />
    </div>
  );
};

export default ArchaeolgistTableRow;
