import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../../assets/images/anime_logo.png";
import { sidebarItems } from "../../data/sidebarData"
import { useStore } from "../../store/store";
import userImg from "../../../assets/svg/user.svg"

const actorSidebarItems: any = {
  admin: sidebarItems
};

const Sidebar = ({ actor = "admin" }) => {
  const navigate = useNavigate();
  const { user, signOut } = useStore();

  const [name, setName] = useState(user.name);
  const [imageUrl, setImageUrl] = useState(user.avatar?.medium);
  const [email, setEmail] = useState(user.email);

  const chosenSidebarItems = actorSidebarItems[actor];

  const [openSubnav, setOpenSubnav] = useState(false);
  const showSubnav = () => setOpenSubnav(!openSubnav);

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  useEffect(() => {
    setName(user.name);
    setImageUrl(user.avatar?.medium);
    setEmail(user.email)
    console.log(imageUrl)
  }, [name, email, imageUrl]);


  // log out function
  const logOut = async () => {
    signOut()
    navigate("/");
  }

  return (
    <div className="w-72 h-full top-0 left-0 fixed bg-[#F9FAFB] border border-r-[#E4E7EC] px-6 py-8 flex flex-col space-y-20 z-10">
      <header>
        <div className="flex items-center gap-x-5">
          <img src={logo} alt="logo" width={80} />
          <h1 className="font-semibold text-sm w-1/2 leading-4 text-[#601800]">
            Anime Stash Manager
          </h1>
        </div>
      </header>

      <div className="menu-bar h-full flex flex-col justify-between gap-10 text-[#344054]">
        <div className="grid gap-5">
          {chosenSidebarItems.map((menuItem: any, index: any) => (
            <div key={index}>
              <Link
                to={!menuItem.submenu ? menuItem.path : pathname}
                key={menuItem.id}
                onClick={menuItem.submenu && showSubnav}
                className={
                  splitLocation[1] === menuItem.path.split("/").join("")
                    ? "flex items-center justify-between bg-[#CF3D0C] py-2 px-3 rounded-md text-white"
                    : "flex items-center justify-between px-3"
                }
              >
                <div className="flex items-center gap-3 font-medium">
                  <h1 className="text-base">{menuItem.title}</h1>
                </div>
                {/* dropdown arrow */}
                <div>
                  {menuItem.submenu && (
                    <IoIosArrowDown
                      color={
                        splitLocation[1] === menuItem.path.split("/").join("")
                          ? "white"
                          : "#CF3D0C"
                      }
                      className={`${openSubnav && "rotate-180"} duration-300`}
                    />
                  )}
                </div>
              </Link>

              {/* submenu dropdown */}
              <div
                className={
                  menuItem.submenu && openSubnav
                    ? "w-full float-right flex flex-col items-start gap-1.5 mt-4 duration-300"
                    : ""
                }
              >
                {openSubnav &&
                  menuItem.submenu?.map((sub, i) => (
                    <div key={i}>
                      <Link
                        to={sub.path}
                        onClick={() => setOpenSubnav(!openSubnav)}
                        key={sub.id}
                        className="text-sm leading-6 pl-5"
                      >
                        {sub.title}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-content space-y-5">
          <div className="grid mb-6">
            <Link to={"/"} className="px-3" onClick={logOut}>
              <div className="flex items-center gap-3 font-medium text-[#B81919]">
                <FiLogOut />
                <h1 className="text-base">Logout</h1>
              </div>
            </Link>
          </div>
          <span className="text-xs text-[#98A2B3]">App version 1.0.0</span>
          <hr />
          <div key={user.id} className="flex justify-between text-sm">
            <div className="flex items-center gap-3">
              <img
                src={imageUrl ? imageUrl : userImg}
                alt="user"
                width={40}
                height={40}
                className="rounded-full bg-white w-10 lg:w-11 h-10 lg:h-11"
              />
              <div>
                <p className="font-medium">
                  {name}
                </p>
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
