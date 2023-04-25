import './Header.scss';

import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


import SquareImage from '../SquareImage'
import { AuthContext } from "../../ContextProvider";



const  Header = () => {
  
  const userContext = useContext(AuthContext);

  return (
   <header className="user-header">
    <h5 className="user-name">{userContext.user.display_name || "Me"}</h5>
    <SquareImage 
      className="user-image" 
      size="3rem"
      radius="50%"
      src={userContext.user.images[0] || window.location.origin+"/assets/user.png"} /> 
    <div className="user-stats">
      <span><FontAwesomeIcon icon={faEye} />{userContext.user.followers.total}</span>
    </div>
   </header> 
  );
}

export default Header;

