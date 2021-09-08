import { useRouteMatch, Route } from "react-router-dom";
import { Wrapper } from "../../../assets/styles/wrappers.enum";
import EmbalmerSarcophagi from "../../../components/SarcophagusTomb/EmbalmerSarcophagi";
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
        {/* <Route path={`${match.path}/resurrect`}>
          <Recipient refresh={refresh} />
        </Route>
        <Route path={`${match.path}/archive`}>
          <Archived refresh={refresh} />
        </Route> */}
      </div>
    </div>
  );
}

export default TombIndex;