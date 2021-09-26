import { utils } from "ethers";
import { useState } from "react";
import { useWeb3 } from "../../web3";
import Button from "../../components/layout/Button";
import icon from "../../assets/images/copy.svg";
import { toast } from "react-toastify";
import { Heading } from "../../assets/styles/headings.enum";

const PublicKey = () => {
  const [publicKey, setPublicKey] = useState("");
  const { account, signerOrProvider } = useWeb3();

  const getPublicKey = async () => {
    if (!signerOrProvider) return;
    try {
      // todo needed to add this line to prevent type error
      // todo this will need to be updated to handle this situation better
      const signer: any = signerOrProvider;
      const msg = "Hello from the Sarcophagus! Sign this message to retrieve your account's public key";
      const msgHash = utils.hashMessage(msg);
      const msgHashBytes = utils.arrayify(msgHash);
      const signature = await signer?.signMessage(
        "Hello from the Sarcophagus! Sign this message to retrieve your account's public key"
      );
      const recoveredPubKey = utils.recoverPublicKey(msgHashBytes, signature);
      setPublicKey(recoveredPubKey);
    } catch (error: any) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.error("We can encrypt anything without the key.");
      } else {
        console.error(error);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    toast.dark("Copied to clipboard", { autoClose: 2000 });
  };

  return (
    <div className="p-4 flex gap-4 flex-wrap md:flex-nowrap justify-center md:justify-start">
      <div className="mr-4 mt-2 text-md w-104 md:w-128 leading-8">
        <div className="font-bold">
          To receive and decrypt a Sarcophagus after resurrection, the embalmer needs your public key.
        </div>
        <div className="mt-4">
          <div className="mt-2">1. Log in with the account that will receive Sarcophagus</div>
          <div className="mt-2">2. Click below to retrieve your public key</div>
          <div className="mt-2">2. Give your public key to the embalmer</div>
        </div>
        <Button
          isDisabled={!account}
          addClasses="mt-12"
          type="button"
          onClick={getPublicKey}
          label="Get Public Key"
        />
      </div>

      <div className="flex flex-col items-center mt-2 relative">
        {publicKey && (
          <>
            <div className="absolute right-1" onClick={handleCopy}>
              <img src={icon} alt="" className="w-5" />
            </div>
            <div className={Heading.PageHeading}>
              <span>Your Public Key</span>
            </div>
            <div className="border-t-2 border-b-2 border-gray-300 py-8 mt-4">
              <div className="bg-black w-104 break-words text-md p-4"> {publicKey} </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublicKey;
