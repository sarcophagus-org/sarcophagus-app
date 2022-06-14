import { BigNumber } from "@ethersproject/bignumber";
import classnames from "classnames";
import { Archaeologist } from "../../../stores/Archaeologist/archaeologist.interfaces";

import {
  archTotalFees,
  getCursedPercentage,
  getDatefromBigNumber,
  getNumberalString,
  getStorageFee,
} from "../../shared/components.utils";

interface ArchaeologistDataProps {
  archaeologist: Archaeologist;
  file: File | null;
  isSelected: boolean;
  open: boolean;
  isArchaeologistMaxResValid: boolean;
}

const MAX_RESURRECTION_PAST_TEXT = "Max Resurrection time has past";

const Property = ({ label }: { label: string }) => <span className="text-gray-400 mr-2">{label}</span>;

const Value = ({ value, selected }: { value: string; selected: boolean }) => (
  <span
    className={
      !selected
        ? classnames("text-white", { "text-red": value === MAX_RESURRECTION_PAST_TEXT })
        : classnames("text-black")
    }
  >
    {" "}
    {value}
  </span>
);

const ArchaeologistData = ({
  archaeologist,
  file,
  isSelected,
  open,
  isArchaeologistMaxResValid,
}: ArchaeologistDataProps) => {
  if (!open) return null;
  return (
    <div className="border-t border-gray-500 py-4 px-8 w-full">
      <div className="flex">
        <span className="text-gray-400 mr-2">Arch </span>
        <span>{archaeologist.address}</span>
      </div>
      <div className="flex mb-4">
        <span className="text-gray-400 mr-2">Endpoint </span>
        <span>{archaeologist.endpoint}</span>
      </div>
      <div className="grid grid-cols-2 text-sm gap-4">
        <div className="">
          <div className="flex">
            <Property label="Accused Sarcophagi" />
            <Value
              selected={isSelected}
              value={getNumberalString(archaeologist.accusedCount as BigNumber, 0, true)}
            />
          </div>
          <div className="flex">
            <Property label="Cleaned Sarcophagi" />
            <Value
              selected={isSelected}
              value={getNumberalString(archaeologist.cleanupCount as BigNumber, 0, true)}
            />
          </div>
          <div className="flex">
            <Property label="Canceled Sarcophagi" />
            <Value
              selected={isSelected}
              value={getNumberalString(archaeologist.canceledCount as BigNumber, 0, true)}
            />
          </div>
          <div className="flex">
            <Property label="Successful Sarcophagi" />
            <Value
              selected={isSelected}
              value={getNumberalString(archaeologist.successesCount as BigNumber, 0, true)}
            />
          </div>
          <div className="flex">
            <Property label="Percent Cursed:" />
            <Value
              selected={isSelected}
              value={`${getCursedPercentage(archaeologist?.cursedBond, archaeologist?.freeBond)}`}
            />
          </div>
          <div className="flex whitespace-nowrap">
            <Property label="Max Resurrection Time:" />
            <Value
              selected={isSelected}
              value={
                isArchaeologistMaxResValid
                  ? getDatefromBigNumber(archaeologist?.maximumResurrectionTime)
                  : MAX_RESURRECTION_PAST_TEXT
              }
            />
          </div>
        </div>
        <div>
          <div className="flex">
            <Property label="Min Digging Fee:" />
            <Value selected={isSelected} value={getNumberalString(archaeologist?.minimumDiggingFee, 18)} />
          </div>
          <div className="flex">
            <Property label="Min Bounty:" />
            <Value selected={isSelected} value={getNumberalString(archaeologist?.minimumBounty, 18)} />
          </div>
          <div className="flex">
            <Property label="Fee per byte:" />
            <Value selected={isSelected} value={getNumberalString(archaeologist?.feePerByte, 18)} />
          </div>
          <div className="flex">
            <Property label="Total Storage Fee" />
            <Value selected={isSelected} value={getStorageFee(archaeologist, file)} />
          </div>
          <div className="flex">
            <Property label="Total Fees" />
            <Value selected={isSelected} value={archTotalFees(archaeologist, file)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchaeologistData;
