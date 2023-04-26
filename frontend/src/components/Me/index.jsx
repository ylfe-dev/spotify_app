import './Me.scss';

import Header from "./Header"
import Saved from "./Saved"


const  Me = () => {

  return (
    <section className="app-me app-container">
      <Header />
      <Saved />
    </section>
  );
}

export default Me;

