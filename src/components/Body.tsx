import { Redirect, Route } from "react-router-dom";
import { Wrapper } from "../assets/styles/wrappers.enum";
import { ClientRoutes } from "../config/clientRoutes";
import SarcophagusTomb from "../containers/SarcophagusTomb";
import CreateSarcophagus from "../containers/SarcophagusCreate";
import PublicKey from "../containers/PublicKey";
import SarcophagusResurrection from '../containers/SarcophagusResurrection'
import ArchaeologistAccuse from '../containers/ArchaeologistAccuse'

const Body = () => {
  return (
    <div className={Wrapper.Body} style={{ minHeight: "calc(100vh - 16rem)" }}>
      <Route path={`/`} exact>
        <Redirect to="/tomb" />
      </Route>
      <Route path={ClientRoutes.Tomb} component={SarcophagusTomb} />
      <Route path="/create" component={CreateSarcophagus} exact />
      <Route path='/resurrection' component={SarcophagusResurrection} exact />
      <Route path='/horus' component={ArchaeologistAccuse} exact />
      <Route path='/publicKey' component={PublicKey} exact />
    </div>
  );
};
export default Body;
