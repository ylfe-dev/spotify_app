import "./Header.scss";

import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPowerOff, faHome } from "@fortawesome/free-solid-svg-icons";

import SquareImage from "../SquareImage";
import { AuthContext } from "../../ContextProvider";

import oauthAPI from "../../API/oauth";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log("Header rerender");
  return (
    <header className="user-header">
      <h5 className="user-name">{user.display_name || "Me"}</h5>
      <SquareImage
        className="user-image"
        size="3rem"
        radius="50%"
        src={user.images[0] || window.location.origin + "/assets/user.png"}
      />
      <div className="user-stats">
        <LogoutButton />
        <span>
          <FontAwesomeIcon icon={faEye} />
          {user.followers.total}
        </span>
      </div>
    </header>
  );
};

export default Header;

const LogoutButton = () => {
  const { setUser } = useContext(AuthContext);
  function clickHandler() {
    oauthAPI.logout().then(() => setUser(null));
  }
  return (
    <button className="logout-button button" onClick={clickHandler}>
      <FontAwesomeIcon icon={faPowerOff} />
    </button>
  );
};
