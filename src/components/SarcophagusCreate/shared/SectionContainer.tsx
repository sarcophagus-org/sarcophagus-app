import classnames from 'classnames'

interface SectionContainerProps {
  transition: boolean;
  addClasses?: string;
  onClick?: () => void;
  children: JSX.Element | JSX.Element[];
}

const base = "py-12 pr-2 relative border-b border-gray-500"

const SectionContainer = ({transition, addClasses, children, ...rest}: SectionContainerProps) => (
  <div className={!transition ? classnames(base, addClasses) : classnames(base, 'ease-in-transition', addClasses)} {...rest}>
    {children}
  </div>
)

SectionContainer.defaultProps = {
  transition: true
}

export default SectionContainer