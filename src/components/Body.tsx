import { Redirect, Route } from 'react-router-dom'
import { Wrapper } from '../assets/styles/wrappers.enum'
import { ClientRoutes } from '../config/clientRoutes'
import SarcophagusTomb from '../containers/SarcophagusTomb'
// import CreateSarcophagus from './create'
// import Resurrection from './Resurrection'
// import AccuseArchaeologist from './Accuse'
// import PublicKey from './PublicKey'

const Body = () => {
  return (
    <div className={Wrapper.Body} style={{minHeight: 'calc(100vh - 16rem)'}}>
      <Route path={`/`} exact>
        <Redirect to="/tomb" />
      </Route>
      <Route path={ClientRoutes.Tomb} component={SarcophagusTomb} />
      {/* <Route path='/create' component={CreateSarcophagus} exact />
      <Route path='/resurrection' component={Resurrection} exact />
      <Route path='/horus' component={AccuseArchaeologist} exact />
      <Route path='/publicKey' component={PublicKey} exact /> */}
    </div>
  )
}
export default Body