import classnames from 'classnames'

interface ErrorTextProps {
  isVisible: boolean;
  text?: string;
  addClasses?: string;
}

const ErrorText = ({isVisible, text, addClasses}: ErrorTextProps) => {
  if(!isVisible) return null

  return (
    <div className={classnames("text-sm text-red", addClasses)}>{text}</div>
  )
}

export default ErrorText