import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import CategoryView from "./modules/category/entry/CategoryView"
import PageNotFound404 from "./modules/404/entry/PageNotFound404"
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <DefaultLayout />,
      children: [
        {
          path:"/categories",
          element: <CategoryView />
        }
      ]
    },
    {
      path:"/*",
      element: <PageNotFound404 />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App