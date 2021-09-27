import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Heading } from "../../../assets/styles/headings.enum";
import { Wrapper } from "../../../assets/styles/wrappers.enum";
import { useSarcophagiStore } from "../../../stores/Sarcophagi";
import { SarcophagusStore } from "../../../stores/Sarcophagi/sarcophagi.interfaces";
import Tooltip from "../../layout/Tooltip";

const TombNavigation = () => {
  const sarcophagusStore: SarcophagusStore = useSarcophagiStore();

  const match = useRouteMatch()
  return (
    <div className={Wrapper.TombNavigation}>
      <NavLink
        activeClassName="border-b-2 border-white"
        className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0"
        to={`${match.path}`}
        exact
      >
        <div className={Heading.PageHeading}>Sarcophagi ({sarcophagusStore.embalmerSarcophagi.length})</div>
        <Tooltip
          content={
            <div>
              <div>Active sarcophagi</div>
              <div>View current status and resurrected time</div>
            </div>
          }
        />
      </NavLink>
      <NavLink
        activeClassName="border-b-2 border-white"
        className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0"
        to={`${match.path}/resurrect`}
      >
        <div className={Heading.PageHeading}>Resurrect: ({sarcophagusStore.recipientSarcophagi.length})</div>
        <Tooltip
          content={
            <div>
              <div>Received Sarcophagi</div>
              <div>View received Sarcophagi details</div>
            </div>
          }
        />
      </NavLink>
      <NavLink
        activeClassName="border-b-2 border-white"
        className="px-2 pb-4 cursor-pointer whitespace-nowrap flex justif-center items-center flex-shrink-0"
        to={`${match.path}/archive`}
      >
        <div className={Heading.PageHeading}>Archived: ({sarcophagusStore.archivedSarcophagi.length})</div>
        <Tooltip
          content={
            <div>
              <div>Inactive sarcophagi</div>
              <div>View past Sarcophagi</div>
            </div>
          }
        />
      </NavLink>
    </div>
  );
};

export default TombNavigation;
