import ErrorText from "../../layout/ErrorText";
import Tooltip from "../../layout/Tooltip";
import { useArchaeologistsStore } from "../../../stores/Archaeologist";
import { Archaeologist, ArchaeologistsStore } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { archaeologistsTableHeaders } from "../sarcophagusCreate.utils";
import ArchaeolgistTableRow from "./ArchaeologistTableRow";

import PageSelect from "../../shared/PageSelect";
import usePagination from "../hooks/usePagination";
import { SelectArchaeologistProps } from "../../../types/sarcophagusCreate";
import { archTotalFees } from "../../shared/components.utils";
import { ethers } from "ethers";
const ARCHAEOLOGIST_PER_PAGE = 5

interface ArchaeologistTableHeaderCellProps {
  title: string;
  tooltipContent: string;
}

const ArchaeologistTableHeaderCell = (props: ArchaeologistTableHeaderCellProps) => {
  return (
    <div className="flex text-md pl-1.5">
      <div className="mr-2">{props.title}</div>
      <Tooltip content={props.tooltipContent} hideTooltip={!props.tooltipContent} />
    </div>
  );
};

const ArchaeologistSelect = ({ errors, touched, ...rest }: SelectArchaeologistProps) => {
  const archaeologistsStore: ArchaeologistsStore = useArchaeologistsStore();
  const pagination = usePagination(archaeologistsStore.archaeologistsWithStats.length);
  if (!archaeologistsStore.archaeologistsWithStats.length) return null;

  const archaeologistsFilteredByPage = (_: Archaeologist, i: number) =>
    i >= pagination.page * pagination.perPage && i <= (pagination.page + 1) * pagination.perPage - 1;
  
  const archaeologistsFilteredByisVisible = (_: Archaeologist, i: number) => {
    const archTotal = archTotalFees(_, rest.file).toString();
    const isOffline = !_.isOnline
    const isFreeBondGreater = _.freeBond.gte(ethers.utils.parseEther(archTotal));
    return isFreeBondGreater && !isOffline
  }
  return (
    <div>
      <div className="hide-scrollbar overflow-x-scroll w-full whitespace-nowrap">
        <ErrorText isVisible={!!errors.address && !!touched.address} text={errors.address} />
        <div className="flex arch-table-row">
          {archaeologistsTableHeaders(archaeologistsStore.archaeologistsWithStats.filter(archaeologistsFilteredByisVisible)).map((props: ArchaeologistTableHeaderCellProps) => (
            <ArchaeologistTableHeaderCell key={props.title} {...props} />
          ))}
        </div>
        <div className="flex flex-col">
          {archaeologistsStore.archaeologistsWithStats
          .filter(archaeologistsFilteredByisVisible)
            .filter(archaeologistsFilteredByPage)
            .map((archaeologist: Archaeologist, index: number) => (
              <ArchaeolgistTableRow
                key={archaeologist.address + index.toString()}
                touched={touched}
                errors={errors}
                archaeologist={archaeologist}
                {...rest}
              />
            ))}
          {archaeologistsStore.archaeologistsWithStats.length >= ARCHAEOLOGIST_PER_PAGE && <PageSelect {...pagination} />}
        </div>
      </div>
    </div>
  );
};

export default ArchaeologistSelect;
