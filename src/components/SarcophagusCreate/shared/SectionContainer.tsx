import classnames from "classnames";

interface SectionContainerProps {
  transition: boolean;
  addClasses?: string;
  onClick?: () => void;
  children: JSX.Element | JSX.Element[];
}

const BASE = "py-12 pr-2 relative border-b border-gray-500";

const SectionContainer = ({ transition, addClasses, children, ...rest }: SectionContainerProps) => (
  <div className={classnames(BASE, { "ease-in-transition": transition }, addClasses)} {...rest}>
    {children}
  </div>
);

SectionContainer.defaultProps = {
  transition: true,
};

export default SectionContainer;
