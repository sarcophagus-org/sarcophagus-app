import { RewrapFormState } from "../../../SarcophagusTomb/tomb.interfaces";
import Tooltip from "../../../layout/Tooltip";
import { InputHTMLAttributes } from "react";
import { dateTimeString } from "../../../SarcophagusTomb/tomb.utils";
import CustomTimeSelect from "./CustomTimeSelect";
import { getDateInFuture } from '../../components.utils'
import { ResurrectionTimeInterval, SarcophagusCreateValues } from "../../../SarcophagusCreate/sarcophagusCreate.interfaces";
import { FormikErrors } from "formik";

interface ResurrectionTimeFormProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  values: RewrapFormState | SarcophagusCreateValues;
  errors: FormikErrors<RewrapFormState> | FormikErrors<SarcophagusCreateValues>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const RadioInput = ({ name, children, ...rest }: RadioInputProps) => (
  <div className="text-sm" style={{ lineHeight: "2.125rem" }}>
    <input name={name} {...rest} type="radio" />
    <label htmlFor={name}>{children}</label>
  </div>
);

const ResurrectionTimeForm = ({ values, handleChange, setFieldValue }: ResurrectionTimeFormProps) => {
  const weekAhead = getDateInFuture(7);
  const monthAhead = getDateInFuture(30);
  const threeMonthAhead = getDateInFuture(90);
  
  return (
    <div className="flex gap-8 mb-8">
      <div className="border border-gray-500 px-8 py-4 w-112" style={{ height: "15.25rem" }}>
        <div className="flex flex-col justify-around h-full text-gray-400 radio-styles">
          <div className="flex items-center whitespace-nowrap">
            <span className="mr-2 text-gray-400 text-sm" style={{ lineHeight: "1.375rem" }}>
              Resurrection: {dateTimeString(values.resurrectionTime)}
            </span>
            <Tooltip content="Time currently set for resurrection" />
          </div>
          {/* One Week */}
          <RadioInput
            type="radio"
            name="timeSelect-week"
            id="timeSelect-week"
            onChange={handleChange}
            onClick={() => {
              setFieldValue("timeSelect", ResurrectionTimeInterval.Week);
              setFieldValue("resurrectionTime", weekAhead);
              setFieldValue("custom", false);
            }}
            checked={values.timeSelect === ResurrectionTimeInterval.Week}
            value={weekAhead}
            >
            1 week
          </RadioInput>
          {/* One Month */}
          <RadioInput
            type="radio"
            name="timeSelect-month"
            id="timeSelect-month"
            onChange={handleChange}
            onClick={() => {
              setFieldValue("timeSelect", ResurrectionTimeInterval.Month);
              setFieldValue("resurrectionTime", monthAhead);
              setFieldValue("custom", false);
            }}
            checked={values.timeSelect === ResurrectionTimeInterval.Month}
            value={monthAhead}
          >
            1 month
          </RadioInput>
          {/* Three Months */}
          <RadioInput
            type="radio"
            name="timeSelect-three-months"
            id="timeSelect-three-months"
            onChange={handleChange}
            onClick={() => {
              setFieldValue("timeSelect", ResurrectionTimeInterval.ThreeMonths);
              setFieldValue("resurrectionTime", threeMonthAhead);
              setFieldValue("custom", false);
            }}
            checked={values.timeSelect === ResurrectionTimeInterval.ThreeMonths}
            value={threeMonthAhead}
          >
            3 months
          </RadioInput>
          {/* Custom */}
          <RadioInput
            type="radio"
            name="timeSelect-custom"
            id="timeSelect-custom"
            onChange={handleChange}
            onClick={() => {
              if(values.customTime) {
                setFieldValue("timeSelect", ResurrectionTimeInterval.Custom);
                setFieldValue("resurrectionTime", values.customTime);
                setFieldValue("custom", true);
              }
            }}
            checked={values.timeSelect === ResurrectionTimeInterval.Custom}
            value={dateTimeString(values.resurrectionTime)}
          >
            <CustomTimeSelect values={values} setFieldValue={setFieldValue} />
          </RadioInput>
        </div>
      </div>
    </div>
  );
};

export default ResurrectionTimeForm;
