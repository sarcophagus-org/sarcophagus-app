import { useWeb3 } from '../web3'
import packageJson from '../../package.json'

const Footer = () => {
  const { name } = useWeb3()

  return (
    <div className="text-gray-400 text-xs my-4">
      <div className="flex justify-between pb-6">
        <div>v{packageJson.version + '+' + process.env.REACT_APP_GIT_HASH}</div>
        <div>{name}</div>
      </div>
    </div>
  )
}

export default Footer