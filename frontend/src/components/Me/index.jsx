import './Me.scss';

import Header from "./Header"
import Saved from "./Saved"
import Artists from "./Artists"
import Playlists from "./Playlists"

const  Me = () => {

  return (
    <section className="app-me app-container">
      <Header />
      <Saved />
      <Playlists />
      <Artists />
      
    </section>
  );
}

export default Me;

