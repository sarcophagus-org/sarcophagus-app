import packageJson from '../../package.json'

const Footer = () => {
  return (
    <div className="text-gray-400 text-xs my-4">
      <div className="pb-6 text-center">
        <div>v{packageJson.version + '+' + process.env.REACT_APP_GIT_HASH}</div>
      </div>
    </div>
  )
}

export default Footer