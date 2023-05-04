import './Me.scss';

import Header from "./Header"
import Saved from "./Saved"
import Artists from "./Artists"
import Playlists from "./Playlists"
import Player  from '../Player'

const  Me = () => {

  return (
    <section className="app-me">
      <Header className="app-tile"/>
      <Player className="app-tile"/>
      <Saved className="app-tile"/>
      <Playlists className="app-tile"/>
      <Artists className="app-tile"/>
    </section>
  );
}

export default Me;

