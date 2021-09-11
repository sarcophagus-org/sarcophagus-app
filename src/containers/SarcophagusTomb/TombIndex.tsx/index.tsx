import { useRouteMatch, Route } from "react-router-dom";
import { Wrapper } from "../../../assets/styles/wrappers.enum";
import EmbalmerSarcophagi from "../../../components/SarcophagusTomb/EmbalmerSarcophagi";
import RecipientSarcophagi from "../../../components/SarcophagusTomb/RecipientSarcophagi";
import TombNavigation from "../../../components/SarcophagusTomb/TombNavigation";

const TombIndex = () => {
  const match = useRouteMatch();

  return (
    <div className={Wrapper.TombIndex}>
      <TombNavigation />
      <div className="mt-8">
        <Route path={`${match.path}`} exact>
          <EmbalmerSarcophagi />
        </Route>
        <Route path={`${match.path}/resurrect`}>
          <RecipientSarcophagi />
        </Route>
        {/* <Route path={`${match.path}/archive`}>
          <Archived refresh={refresh} />
        </Route> */}
      </div>
    </div>
  );
};

export default TombIndex;