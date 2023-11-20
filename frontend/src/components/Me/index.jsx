import "./Me.scss";

import { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faHome, 
  faArrowLeft, 
  faUpRightAndDownLeftFromCenter, 
  faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Saved from "./Saved";
import Artists from "./Artists";
import Playlists from "./Playlists";
import Accordion from "../Accordion";
import Search from "./Search";
import Footer from "../Footer"

const Me = ({ menuState, setMenuState }) => {
  const [fullScreen, setFullScrenn] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  const burgerMenuHandle = () => setMenuState(!menuState);
  const goHomeHandle = () => navigate("/");
  const handleBack = () => navigate(-1);
  const handleFullScreen = () =>  {
    setFullScrenn(!fullScreen)
    if (fullScreen) document.exitFullscreen();
    else  document.body.requestFullscreen();
  }

  

  useEffect(() => setMenuState(false), [location]);

  const memoAccordion = useMemo(
    () => (
      <Accordion>
        <Saved accordion-id="0" className="app-tile accordion-item active" />
        <Playlists accordion-id="1" className="app-tile accordion-item" />
        <Artists accordion-id="2" className="app-tile accordion-item" />
      </Accordion>
    ),
    []
  );

  return (
    <section className="app-me">

      <div className={"app-menu " + (menuState ? "active" : "hidden")}>
        {memoAccordion}
        <Footer/>
      </div>

      <Search/>

      <Header className="app-tile" />
      <button id="burger-menu" onClick={burgerMenuHandle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <button id="go-home" onClick={goHomeHandle}>
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button id="go-fullscreen" onClick={handleFullScreen}>
        <FontAwesomeIcon 
        icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
      </button>
      <button id="go-back" onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      
      
      
    </section>
  );
};

export default Me;



