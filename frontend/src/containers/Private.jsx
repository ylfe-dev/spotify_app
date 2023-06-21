import "./Private.scss";

import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import { PlayerProvider } from "../ContextProvider";
import Spinner from "../components/Spinner";
import { suspensePromise, wait } from "../utils";

import Me from "../components/Me";
import Content from "../components/Content";
import Player from "../components/Player";



const Private = () => {
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("Private rerender");
  const [menuState, setMenuState] = useState(false);
  return (
    <main className="app-private">
      <PlayerProvider>
        <Me menuState={menuState} setMenuState={setMenuState} />
        <Player className={menuState ? "mobile-menu-opened" : ""} />
        <Content className={menuState ? "mobile-menu-opened" : ""} />
   
      </PlayerProvider>
    </main>
  );
};

export default Private;
