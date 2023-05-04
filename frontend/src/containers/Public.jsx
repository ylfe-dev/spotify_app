import './Public.scss';

import { Suspense, useContext, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'


import Spinner from '../components/Spinner'
import { suspensePromise } from '../utils'
import { AuthContext } from "../ContextProvider";

import oauthAPI from '../API/oauth'

const Public = () => {
  console.log("Public rerender")
  const session_fetch = suspensePromise(oauthAPI.probe());
  const { user } = useContext(AuthContext);

  if(!user)
    return (
      <main className="app-public">
        <Suspense fallback={<Spinner/>}>
          <Login fetcher={session_fetch}/>
        </Suspense>
      </main>
    )
  else return <Navigate to="/" replace={true} />
}

export default Public;




const Login = ({fetcher}) => {
  const session = fetcher.read();
  const { setUser } = useContext(AuthContext);


  useEffect(()=>{
    if(session && session.user) 
      setUser(session.user);
  },[])
 
  if(session && session.oauth_link)
    return (
      <div className="app-container scale-in">
        <FontAwesomeIcon icon={faUser} />
        <h2>Let's explore music!</h2>
        <a href={session.oauth_link} className="app-login-button mt-2">
          Login with <b className="ms-1">Spotify</b> 
          <FontAwesomeIcon className="ms-1" icon={faSpotify} />
        </a>
      </div>
    )
  else return null;
  
}