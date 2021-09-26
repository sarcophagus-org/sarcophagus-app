import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import wallet from "../../assets/images/wallet.svg";
import AccountDisplay from "./AccountDisplay";
import SiteNavigation from "./SiteNavigation";

const SiteHeader = () => {
  return (
    <div className="flex justify-between my-12 text-sm text-gray-300 " style={{ height: "4rem" }}>
      <div className="flex items-center">
        <div className="mr-8">
          <NavLink to="/tomb">
            <img src={logo} alt="logo" className="w-20" />
          </NavLink>
        </div>
        <SiteNavigation />
      </div>
      <div className="flex items-center -mt-2">
        <div>
          <img src={wallet} alt="wallet" className="" />
        </div>
        <AccountDisplay />
      </div>
    </div>
  );
};

export default SiteHeader;
