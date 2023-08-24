import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {Outlet} from "react-router-dom"
const DefaultLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-y-2 bg-lightgray-hard">
        <Navbar />
        <div className="h-full flex-1 flex flex-row gap-x-2">
            <div className="overflow-scroll bg-lightgray-soft rounded-md">
                <Sidebar />
            </div>
            <div className="flex-1 overflow-scroll">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DefaultLayout