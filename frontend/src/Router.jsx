import {createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./ErrorPage"
import App from './App';
import OAuth from './containers/OAuth';
import Background from './components/Background'



  
const Router = () => {
  const app = <App />;
  const router = createBrowserRouter([
  {
      path: "/",
      element: <Background />,
      errorPage: <ErrorPage/>,
      children:
      [
        { element: app, path: "/" },
        { element: app, path: "/album/:album" },
        { element: app, path: "/playlist/:playlist" },
        { element: app, path: "/artist/:artist/:album?" },

        { element: <OAuth/>, path: "/oauth", }
      ]
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}
export default Router;