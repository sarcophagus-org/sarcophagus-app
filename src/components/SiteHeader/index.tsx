import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import wallet from "../../assets/images/wallet.svg";
import AccountDisplay from "./AccountDisplay";
import SiteNavigation from "./SiteNavigation";

const SiteHeader = () => {
  return (
    <div className="flex items-center justify-between my-12" style={{ height: "4rem" }}>
      <div className="flex items-center">
        <div className="w-24 mr-8">
          <NavLink to="/tomb">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="flex items-center justify-center">
          <SiteNavigation />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <img src={wallet} alt="wallet" className="" />
        </div>
        <div className="ml-3 text-sm text-gray-300 ">
          <AccountDisplay />
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
