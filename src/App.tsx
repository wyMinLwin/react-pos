import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import CategoryView from "./modules/category/entry/CategoryView"
import PageNotFound404 from "./modules/404/entry/PageNotFound404"
import SettingView from "./modules/setting/entry/SettingView"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ItemView from "./modules/item/entry/ItemView"
import { Provider } from "react-redux"
import store from "./store"
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
        },
        {
          path:"/items",
          element: <ItemView />
        },
      ]
    },
    {
      path:"/settings",
      element: <SettingView />
    },
    {
      path:"/*",
      element: <PageNotFound404 />
    },

  ])
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClinet}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App