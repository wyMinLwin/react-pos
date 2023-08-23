import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import CategoryView from "./modules/category/entry/CategoryView"
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <DefaultLayout />,
      children: [
        {
          path:"/category-management",
          element: <CategoryView />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App