import './Me.scss';

import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Header from "./Header"
import Saved from "./Saved"
import Artists from "./Artists"
import Playlists from "./Playlists"
import Accordion from "../Accordion"

const  Me = ({menuState, setMenuState}) => {
  const burgerMenuHandle = () => setMenuState(!menuState)

  const memoAccordion = useMemo(()=>
    <Accordion>
      <Saved  accordion-id="0" className="app-tile accordion-item active"/>
      <Playlists accordion-id="1" className="app-tile accordion-item"/>
      <Artists accordion-id="2" className="app-tile accordion-item"/>
    </Accordion>
  ,[])
  return (
    <section className="app-me">
      <Header className="app-tile"/>
      <button id="burger-menu" onClick={burgerMenuHandle}><FontAwesomeIcon icon={faBars} /></button>
      <div  className={"app-menu "+(menuState ? "active" : "hidden")}>
        {memoAccordion}
      </div>
    </section>
  );
}

export default Me;

