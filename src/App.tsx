import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import CategoryView from "./modules/category/entry/CategoryView"
import PageNotFound404 from "./modules/404/entry/PageNotFound404"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const App = () => {
  const queryClinet = new QueryClient();
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
    <QueryClientProvider client={queryClinet}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App