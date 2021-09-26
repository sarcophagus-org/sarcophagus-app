import { NavLink as Link } from "react-router-dom";

interface ILinkWithIconProps {
  title: string;
  dest: string;
  icon: string;
}

const LinkWithIcon = ({ title, dest, icon, ...rest }: ILinkWithIconProps) => (
  <Link
    to={dest}
    className="text-md flex items-center justify-center hover:text-white pb-2"
    activeClassName="border-b md:border-b-2 border-white text-white"
    {...rest}
  >
    <img alt="" src={icon} className="mr-2 w-5 h-5"/>
    <span className="">{title}</span>
  </Link>
);

export default LinkWithIcon;
