import { Link } from "react-router-dom"

const PageNotFound404 = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
        <div className="p-0 text-6xl shaking">404</div>
        <div className="text-3xl font-light">Page Not Found</div>
        <Link to="/" className="bg-bluejeans-soft text-lightgray-soft px-4 py-2 rounded-md">Bach to Dashboard</Link>
    </div>
  )
}

export default PageNotFound404