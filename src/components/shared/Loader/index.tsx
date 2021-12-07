import icon from '../../../assets/images/logo.png'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 gap-4">
      <img alt="" src={icon} className="animate-pulse w-20"/>
      <div>Loading...</div>
    </div>
  )
}

export default Loader