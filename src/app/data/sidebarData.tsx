import { FiLogOut } from "react-icons/fi";
import userImg from "../../assets/svg/user.svg";

export const sidebarItems = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Anime Categories",
    path: "/category",
  }
];

export const userDetails = [
  {
    id: 1,
    image: userImg,
    username: "Ama Ghana",
    company_name: "Company Name",
    logout_icon: <FiLogOut size={15} />,
  },
];
