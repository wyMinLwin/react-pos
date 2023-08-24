import { Outlet } from 'react-router-dom'

const BlankLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-lightgray-hard">
        <Outlet />
    </div>
  )
}

export default BlankLayout