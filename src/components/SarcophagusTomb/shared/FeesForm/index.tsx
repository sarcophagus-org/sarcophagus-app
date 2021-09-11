import classnames from "classnames";
import { Wrapper } from "../../../../assets/styles/wrappers.enum";
import ErrorText from "../../../layout/ErrorText";
import Tooltip from "../../../layout/Tooltip";
import { RewrapFormErrors, RewrapFormState } from "../../tomb.interfaces";

interface FeesFormProps {
  addClasses?: string;
  values: RewrapFormState;
  errors?: RewrapFormErrors;
  isDescriptionShown: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface FeeTitleAndInputProps {
  title: string;
  name: string;
  toolTipContent: string;
  error?: string;
  value?: string | number;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FeeTitleAndInput = ({ value, error, name, title, toolTipContent, handleChange }: FeeTitleAndInputProps) => {
  return (
    <div className={`flex flex-col mr-8 w-27.5`}>
      <div className="flex flex-col whitespace-nowrap mb-2">
        <div className="flex items-center">
          <span className="mr-2 text-gray-400 text-sm whitespace-nowrap" style={{ lineHeight: "1.375rem" }}>
            {title}
          </span>

          <Tooltip content={toolTipContent} />
        </div>
        <ErrorText isVisible={!!error} text={error} addClasses="py-2" />
      </div>
      <input
        type="text"
        height="lg"
        className="input-placeholder w-full pl-4 text-md bg-black font-normal text-white border remove-input-steps focus:outline-none border-gray-500 py-1"
        placeholder="100"
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
    </div>
  );
};

const FeesDescription = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  return (
    <div className="text-2xs px-8 text-gray-400 order-first md:order-last md:pt-4">
      Archaeologists are sorted by their minimum fees. After you select one, that minimum fee will be set with
      the option to increase.
    </div>
  );
};

const FeesForm = ({ addClasses, values, errors, handleChange, isDescriptionShown }: FeesFormProps) => {
  return (
    <div className={classnames(Wrapper.FeesForm, addClasses)}>
      <div className="flex justify-center flex-wrap sm:flex-nowrap gap-8">
        <FeeTitleAndInput
          error={errors?.bounty}
          value={values.bounty}
          title="Bounty &#x2739;"
          name="bounty"
          handleChange={handleChange}
          toolTipContent="Max Bounty. Paid to the Archaeologist for a successful resurrection (keep default unless adv user)"
        />
        <FeeTitleAndInput
          error={errors?.diggingFee}
          value={values.diggingFee}
          title="Digging Fees &#x2739;"
          name="diggingFee"
          handleChange={handleChange}
          toolTipContent="Max Digging Fees. Paid to the archaeologist after re-wrap (keep default unless adv user)"
        />

        <FeesDescription isVisible={isDescriptionShown} />
      </div>
    </div>
  );
};

export default FeesForm;
