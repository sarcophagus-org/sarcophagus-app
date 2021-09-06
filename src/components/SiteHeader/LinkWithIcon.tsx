import { NavLink as Link } from "react-router-dom";

interface ILinkWithIconProps {
  title: string;
  dest: string;
  icon: string;
}

interface INavIconProps {
  icon?: string;
}

const Icon = ({ icon }: INavIconProps) => {
  if (!icon) return null;
  return <img src={icon} alt="" className="mx-1 h-4 w-4" />;
};

const LinkWithIcon = ({ title, dest, icon, ...rest }: ILinkWithIconProps) => (
  <Link
    to={dest}
    activeClassName="border-b-2 md:border-b-4 border-white text-white pb-2"
    className="text-sm text-gray-300 flex items-center justify-center"
    {...rest}
  >
    <Icon icon={icon} />
    <span className="hidden md:inline-block ml-2">{title}</span>
  </Link>
);

export default LinkWithIcon;
