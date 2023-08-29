import { NavLink, useLocation } from "react-router-dom"
import { SidebarItemType } from "../types/globalTypes"
import {BiSolidCategory} from "react-icons/bi"
import {MdGroups2} from "react-icons/md"
import {FaSitemap} from "react-icons/fa"
import {GrMoney} from "react-icons/gr"
const navbarItemsList:Array<SidebarItemType> = [
    {
        icon: <BiSolidCategory size="22" />,
        label: "Categories",
        url: "/categories" 
    },
    {
        icon: <FaSitemap size="22" />,
        label: "Items",
        url: "/items" 
    },
    {
        icon: <MdGroups2 size="22" />,
        label: "Employees",
        url: "/employees" 
    },
    {
        icon: <GrMoney size="22" />,
        label: "Purchase",
        url: "/purchase" 
    },
    
]
const Sidebar = () => {
    const location = useLocation();
  return (
    <div className="flex flex-col justify-start h-full items-start overflow-y-scroll py-4">
        {
            navbarItemsList.map((nav) => (
                <NavLink to={nav.url} key={nav.label} className={`flex flex-col justify-center items-center text-important rounded-lg w-20 mx-auto py-3 transition-colors ${nav.url === location.pathname ? 'bg-bittersweet-soft text-lightgray-soft' :'text-darkgray-hard'}`}>
                    {nav.icon}
                    <span className="text-sm">{nav.label}</span>
                </NavLink>
            ))
        }
    </div>
  )
}

export default Sidebar