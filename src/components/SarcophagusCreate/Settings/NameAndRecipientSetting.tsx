import { NavLink } from "react-router-dom";
import arrowDown from "../../../assets/images/arrowDown.svg";
import icon from "../../../assets/images/name.svg";
import SectionContainer from "../shared/SectionContainer";
import ErrorText from "../../layout/ErrorText";
import { SettingsProps } from "../sarcophagusCreate.interfaces";

const NameAndRecipientSettings = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleKey,
  toggle,
}: SettingsProps) => (
  <SectionContainer>
    <div className="flex justify-between cursor-pointer" onClick={toggle}>
      <div className="flex items-center text-white whitespace-pre-wrap md:whitespace-nowrap mr-2">
        <img src={icon} alt="" className="mr-4" />
        <span className="text-md font-bold">Name Sarcophagus and add recipient</span>
      </div>
      <img alt="" src={arrowDown} />
    </div>

    <div className="md:grid md:grid-cols-2 mt-8 md:gap-6">
      <div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <span className="mr-2 text-gray-400 text-sm whitespace-nowrap" style={{ lineHeight: "1.375rem" }}>
              Title
            </span>
          </div>
          <ErrorText isVisible={!!errors.name && !!touched.name} text={errors.name} addClasses="text-2xs" />
        </div>
        <input
          className="w-full pl-4 text-md bg-black font-normal text-white border remove-input-steps focus:outline-none border border-gray-500"
          type="text"
          style={{ height: "2.625rem" }}
          placeholder=""
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={256}
        />
      </div>
      <div className="text-gray-400 text-2xs" style={{ marginTop: "1.75rem" }}>
        The name you choose will be public on the blockchain.
      </div>
    </div>

    <div className="md:grid md:grid-cols-2 mt-8 md:gap-6">
      <div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <span className="mr-2 text-gray-400 text-sm whitespace-nowrap" style={{ lineHeight: "1.375rem" }}>
              Recipient
            </span>
          </div>
          <ErrorText
            isVisible={!!errors.recipientPublicKey && !!touched.recipientPublicKey}
            text={errors.recipientPublicKey}
            addClasses="text-2xs"
          />
        </div>
        <textarea
          className="w-full p-4 bg-black text-white text-md focus:outline-none border border-gray-500"
          style={{ height: "7.75rem" }}
          name="recipientPublicKey"
          value={values.recipientPublicKey}
          onBlur={handleBlur}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) => {
            handleChange(e);
            handleKey(e.target.value);
          }}
          placeholder="0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        />
      </div>
      <div className="text-gray-400 text-2xs" style={{ marginTop: "1.75rem" }}>
        <div className="border-b border-gray-400 mb-4" style={{ width: "fit-content" }}>
          Eth public key
        </div>
        <div className="text-gray-400 leading-5">
          <NavLink className="cursor-pointer mr-2 underline hover:text-gray-300 text-white" to="/publicKey">
            Click here
          </NavLink>
          to get your recipient’s full Ethereum public key. (This is not the same as a public address.) When
          resurrecting the Sarcophagus, the recipient will need to input the private key of their Ethereum
          public key. They can generate a fresh Ethereum public key if concerned with private key exposure.
        </div>
      </div>
    </div>
  </SectionContainer>
);

export default NameAndRecipientSettings;
