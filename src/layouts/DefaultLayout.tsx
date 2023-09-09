import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import {Outlet} from "react-router-dom"
const DefaultLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-y-2 bg-lightgray-hard">
        <Navbar />
        <div className="grow flex flex-row overflow-scroll">
            <div className="w-2/12 lg:w-1/12 xl:w-24 w-overflow-scroll bg-lightgray-soft rounded-tsm pb-4 ">
              <Sidebar />
            </div>
            <div className="w-10/12 lg:w-11/12 xl:w-full overflow-scroll mx-2 bg-lightgray-soft rounded-t-md border-t-4 border-bittersweet-soft">
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DefaultLayout