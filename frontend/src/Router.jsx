import {createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./ErrorPage"
import App from './App';
import OAuth from './containers/OAuth';
import Background from './components/Background'



  
const Router = () => {

  const router = createBrowserRouter([
  {
      path: "/",
      element: <Background />,
      errorPage: <ErrorPage/>,
      children:
      [
        {
          path: "/",
          element: <App />
        },
        {
          path: "/album/:album",
          element: <App />
        },
        {
          path: "/artist/:artist/:album?",
          element: <App />
        },
        {
          path: "/oauth",
          element: <OAuth/>
        }
      ]
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}
export default Router;