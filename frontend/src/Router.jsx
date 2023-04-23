import {createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./ErrorPage"
import App from './App';

/*
import Projects from "./containers/Projects"
import About from "./containers/About"
import Skills from "./containers/Skills"
*/



  
const Router = () => {

  const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorPage: <ErrorPage/>,
    },
    {
       path: "/album/:album",
      element: <App />
    },
    {
      path: "/:artist/:album?",
      element: <App />
    },
    {
      path: "/me",
      element: <App />
    }
  ]);

  return (
      <RouterProvider router={router} />
  )
}
export default Router;