import { NavLink, useLocation } from "react-router-dom"
import { SidebarItemType } from "../types/globalTypes"
import {BiSolidCategory} from "react-icons/bi"
import {MdGroups2} from "react-icons/md"
import {FaSitemap} from "react-icons/fa"
import {GrMoney} from "react-icons/gr"
const navbarItemsList:Array<SidebarItemType> = [
    {
        icon: <BiSolidCategory />,
        label: "Categories",
        url: "/categories" 
    },
    {
        icon: <FaSitemap />,
        label: "Items",
        url: "/items" 
    },
    {
        icon: <MdGroups2 />,
        label: "Employees",
        url: "/employees" 
    },
    {
        icon: <GrMoney />,
        label: "Purchase",
        url: "/purchase" 
    },
    
]
const Sidebar = () => {
    const location = useLocation();
    console.log(location);
  return (
    <div className="px-6 flex flex-col justify-start h-full items-start overflow-y-scroll">
        {
            navbarItemsList.map((nav) => (
                <NavLink to={nav.url} key={nav.label} className={`flex mt-3 justify-start items-center text-important rounded-lg w-full px-8 py-4 ${nav.url === location.pathname ? 'bg-bittersweet-soft text-lightgray-soft' :'bg-lightgray-hard text-darkgray-hard'}`}>
                    {nav.icon}
                    <span className="ml-2 text-base">{nav.label}</span>
                </NavLink>
            ))
        }
    </div>
  )
}

export default Sidebar