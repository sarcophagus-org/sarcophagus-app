import classnames from "classnames";
type OptionsType = {
  [key: string]: string;
};
const heightOptions: OptionsType = {
  sm: "1.25rem",
  md: "2.625rem",
  lg: "2.65rem",
};

const lineHeightOptions: OptionsType = {
  default: "1.625rem",
};

const widthOptions: OptionsType = {
  default: "12.75rem",
};

const base = "text-md font-medium flex justify-center items-center focus:outline-none";
const border = "text-white border border-white";
const disabled = "text-gray-400 border border-500 cursor-default";
const error = "";

interface ButtonProps {
  label: string;
  type: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  addClasses?: string;
  errors?: boolean;
  height?: string;
  width?: string;
  onClick?: () => void;
}

const Button = ({ label, isDisabled, addClasses, errors, height, width, ...rest }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={
        isDisabled
          ? classnames(base, disabled, addClasses)
          : errors
          ? classnames(base, disabled, error, addClasses)
          : classnames(base, border, addClasses)
      }
      style={{
        height: heightOptions[height || "md"],
        width: widthOptions[width || "default"],
        lineHeight: lineHeightOptions["default"],
      }}
      {...rest}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false
}

export default Button;
