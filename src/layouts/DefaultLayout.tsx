import Sidebar from "../components/Sidebar"
import {Outlet} from "react-router-dom"
const DefaultLayout = () => {
  return (
    <>
        <Sidebar />
        <Outlet />
    </>
  )
}

export default DefaultLayout