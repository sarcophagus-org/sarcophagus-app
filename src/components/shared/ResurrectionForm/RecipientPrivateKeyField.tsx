import { FormikErrors } from "formik";
import { Heading } from "../../../assets/styles/headings.enum";
import { ResurrectionFormState } from "../../../types/sarcophagusTomb";
import ErrorText from "../../layout/ErrorText";
import Tooltip from "../../layout/Tooltip";

interface RecipientPrivateKeyFieldProps {
  values: ResurrectionFormState;
  errors: FormikErrors<ResurrectionFormState>;
  isVisible: boolean;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
const RecipientPrivateKeyField = ({
  values,
  errors,
  isVisible,
  handleChange,
}: RecipientPrivateKeyFieldProps) => {
  if (!isVisible) return null;
  return (
    <div>
      <div className="flex items-center my-4">
        <div className={Heading.PageHeading}>Recipient's Private Key</div>
        <Tooltip content="The private key of the receiver of this Sarcophagus" />
      </div>
      <ErrorText
        isVisible={!!errors.recipientPrivateKey}
        text={errors.recipientPrivateKey}
        addClasses="py-2"
      />
      <textarea
        name="recipientPrivateKey"
        className="w-full p-4 my-4 bg-black text-white text-md focus:outline-none border border-gray-500"
        value={values.recipientPrivateKey}
        style={{ height: "7.75rem" }}
        onChange={handleChange}
        placeholder="0x........00000"
      />
    </div>
  );
};
export default RecipientPrivateKeyField;
