import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import App from "./App";
import OAuth from "./containers/OAuth";
import Background from "./components/Background";

const Router = () => {
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("Router rerender");
  
  const app = (
    <>
      <Background />
      <App />
    </>
  );
  const router = createBrowserRouter([
    { element: app, path: "/", errorPage: <ErrorPage /> },
    { element: app, path: "/album/:album" },
    { element: app, path: "/playlist/:playlist" },
    { element: app, path: "/artist/:artist" },

    {
      element: (
        <>
          <Background />
          <OAuth />
        </>
      ),
      path: "/oauth",
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
