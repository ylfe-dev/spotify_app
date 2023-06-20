import "./App.scss";

import { useContext } from "react";
import { AuthContext } from "./ContextProvider";

import Private from "./containers/Private";
import Public from "./containers/Public";

const App = () => {
  const userContext = useContext(AuthContext);

  if(process.env.REACT_APP_LOGS==="debug")
    console.log("App rerender");

  if (userContext.user) return <Private />;
  else return <Public />;
};

export default App;
