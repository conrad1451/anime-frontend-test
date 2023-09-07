import { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import userImg from "../../../assets/svg/user.svg"

const Navbar = ({ page_name }) => {
    const {user} = useStore();

    const [name, setName] = useState(user.name);
    const [imageUrl, setImageUrl] = useState(user.avatar?.medium);

    useEffect(() => {        
        setName(user.name);
        setImageUrl(user.avatar?.medium);
        console.log(imageUrl)
    }, [name, imageUrl]);

    return (
        <section className="flex flex-wrap gap-4 items-center justify-between px-24 py-6 w-full shadow-[0px_4px_4px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-medium">{page_name}</h1>
                <p className="text-[#667085]">{`Welcome back, ${name ? name : "Stranger"}`}</p>
            </div>
            <div className="flex justify-end w-full lg:w-fit items-center gap-4 text-[#667085]">
                <div>
                    <img 
                        key={user.id}
                        src={imageUrl ? imageUrl : userImg}
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full bg-white w-11 lg:w-12 h-11 lg:h-12"
                    />
                </div>
            </div>
        </section>
    );
}
 
export default Navbar;