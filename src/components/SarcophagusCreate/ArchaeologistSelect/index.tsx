import ErrorText from "../../layout/ErrorText";
import Tooltip from "../../layout/Tooltip";
import { SelectArchaeologistProps } from "../sarcophagusCreate.interfaces";
import { Archaeologist, IArchaeologistsStore } from "../../../stores/Archaeologist/archaeologist.interfaces";
import { useArchaeologistsStore } from "../../../stores/Archaeologist";
import ArchaeolgistTableRow from "./ArchaeologistTableRow";
import PageSelect from "../../shared/PageSelect";
import usePagination from "../hooks/usePagination";
import { archaeologistsTableHeaders } from "../sarcophagusCreate.utils";

interface ArchaeologistTableHeaderCellProps {
  title: string;
  tooltipContent: string;
}

const ArchaeologistTableHeaderCell = ({ title, tooltipContent }: ArchaeologistTableHeaderCellProps) => {
  return (
    <div className="flex text-md pl-1.5">
      <div className="mr-2">{title}</div>
      <Tooltip content={tooltipContent} hideTooltip={!tooltipContent} />
    </div>
  );
};

const ArchaeologistSelect = ({ errors, touched, ...rest }: SelectArchaeologistProps) => {
  const archaeologistsStore: IArchaeologistsStore = useArchaeologistsStore();
  const pagination = usePagination(archaeologistsStore.archaeologistsWithStats.length);
  if (!archaeologistsStore.archaeologistsWithStats.length) return null;

  return (
    <div>
      <div className="hide-scrollbar overflow-x-scroll w-full whitespace-nowrap">
        <ErrorText isVisible={!!errors.address && !!touched.address} text={errors.address} />
        <div className="flex arch-table-row">
          {archaeologistsTableHeaders(archaeologistsStore.archaeologistsWithStats).map((props: any) => (
            <ArchaeologistTableHeaderCell key={props.title} {...props} />
          ))}
        </div>
        <div className="flex flex-col">
          {archaeologistsStore.archaeologistsWithStats
            .filter(
              (_: Archaeologist, i: number) =>
                i >= pagination.page * pagination.perPage &&
                i <= (pagination.page + 1) * pagination.perPage - 1
            )
            .map((archaeologist: Archaeologist) => (
              <ArchaeolgistTableRow
                key={archaeologist.address}
                touched={touched}
                errors={errors}
                archaeologist={archaeologist}
                {...rest}
              />
            ))}
          {archaeologistsStore.archaeologistsWithStats.length >= 5 && <PageSelect {...pagination} />}
        </div>
      </div>
    </div>
  );
};

export default ArchaeologistSelect;
