import { HashRouter as Router, Switch } from "react-router-dom";
import Body from "./components/Body";
import Footer from "./components/Footer";
import SiteHeader from "./components/SiteHeader";

const App = () => {
  return (
    <div className="container relative">
      <Router>
        <SiteHeader />
        <Switch>
        <Body />
      </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
