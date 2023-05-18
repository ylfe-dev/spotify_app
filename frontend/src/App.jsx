import "./App.scss";

import { useContext } from "react";
import { AuthContext } from "./ContextProvider";

import Private from "./containers/Private";
import Public from "./containers/Public";

const App = () => {
  const userContext = useContext(AuthContext);

  console.log("App rerender");

  if (userContext.user) return <Private />;
  else return <Public />;
};

export default App;
