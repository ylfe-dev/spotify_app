
import { useContext, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from "../ContextProvider";

import Spinner from '../components/Spinner'
import {suspensePromise, wait} from '../utils'

import userAPI from '../API/user'





const  Reconnect = ({onSuccess}) => {
  const userContext = useContext(AuthContext);
  const [attemp, setAttemp] = useState(0);


  const retry = () => {
    setTimeout(()=>{
      setAttemp(attemp+1)
      console.warn("Reconnect retry");
    }, 2000)
  }

  useEffect(()=>{
    userAPI.me().then(res => {
      switch(res.status){
        case "success": 
          console.log("Logged user: "+res.data)
          userContext.setUser(res.data);
          onSuccess(); 
          break;
        case "denied": 
          console.log("User not logged in.")
          onSuccess(); 
          break;
        default: retry(); break;
      }
    })
  },[attemp])

  return (
    <div className="alert connection">
      <p>Reconnecting </p><Spinner />
    </div>
  );
}

export default Reconnect;
