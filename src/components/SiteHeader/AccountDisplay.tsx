import icon from "../../assets/images/icon.svg";
import { useWeb3 } from "../../web3";
import { connect } from "../../web3/providers";
import { truncate } from "../shared/components.utils";

const AccountDisplay = () => {
  const { account } = useWeb3();

  if (account) {
    return (
      <div className="flex justify-center items-center ml-2 text-gray-300">
        {truncate(account, 19, "...", 7)}
        <img src={icon} alt="" className="ml-4 w-4 h-4" />
      </div>
    );
  }
  return (
    <button className="underline text-center ml-3" onClick={() => connect()}>
      Connect Web3 Account
    </button>
  );
};

export default AccountDisplay;
