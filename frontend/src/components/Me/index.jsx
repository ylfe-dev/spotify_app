import './Me.scss';

import Header from "./Header"
import Saved from "./Saved"
import Artists from "./Artists"
import Playlists from "./Playlists"
import Accordion from "../Accordion"

const  Me = () => {

  return (
    <section className="app-me">
      <Header className="app-tile"/>
      <Accordion>
        <Saved  accordion-id="0" className="app-tile accordion-item active"/>
        <Playlists accordion-id="1" className="app-tile accordion-item"/>
        <Artists accordion-id="2" className="app-tile accordion-item"/>
      </Accordion>
    </section>
  );
}

export default Me;

