import classnames from "classnames";

enum ButtonStyles {
  Base = "leading-medium text-md font-medium flex justify-center items-center focus:outline-none transform hover:text-offWhite active:scale-90",
  Active = "text-white border border-white",
  Height = "h-button-medium",
  Width = "w-button-default",
  Disabled = "text-gray-400 border border-500 cursor-default",
}

interface ButtonProps {
  label: string;
  type: "button" | "reset" | "submit";
  isDisabled?: boolean;
  addClasses?: string;
  height?: "small" | "medium" | "large";
  width?: "default" | "full";
  onClick?: () => void;
}

const Button = ({ label, isDisabled, addClasses, height, width, ...rest }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={classnames(
        ButtonStyles.Base,
        {
          [ButtonStyles.Active]: !isDisabled,
          [ButtonStyles.Disabled]: isDisabled,
          [ButtonStyles.Height]: !height,
          [ButtonStyles.Width]: !width,
          [`w-button-${width}`]: !!width,
          [`h-button-${height}`]: !!height,
        },
        addClasses
      )}
      {...rest}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
