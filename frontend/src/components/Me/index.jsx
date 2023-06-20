import "./Me.scss";

import { useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Saved from "./Saved";
import Artists from "./Artists";
import Playlists from "./Playlists";
import Accordion from "../Accordion";
import Search from "./Search";



const Me = ({ menuState, setMenuState }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const burgerMenuHandle = () => setMenuState(!menuState);
  const goHomeHandle = () => navigate("/");

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
      <Header className="app-tile" />
      <button id="burger-menu" onClick={burgerMenuHandle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <button id="go-home" onClick={goHomeHandle}>
        <FontAwesomeIcon icon={faHome} />
      </button>

      <Search />
      
      <div className={"app-menu " + (menuState ? "active" : "hidden")}>
        {memoAccordion}
      </div>
    </section>
  );
};

export default Me;
