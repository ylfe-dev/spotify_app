import "./Footer.scss"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const server_url = window.location.protocol +"//" + window.location.host;

const  Footer = () => 
  <footer>
    <a href="https://github.com/bartkon"><FontAwesomeIcon icon={faGithub} /></a>
    <p>Powered by </p>
    <img src={server_url + "/spotify.svg"}/>
  </footer>

export default Footer;