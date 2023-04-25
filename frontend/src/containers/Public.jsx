import './Public.scss';

import { Suspense, useContext } from 'react'
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../components/Spinner'
import Reconnect from '../components/Reconnect'
import {suspensePromise, wait} from '../utils'

import userAPI from '../API/user'

const  Public = () => {
  
  const login_link = suspensePromise(userAPI.link());

  return (
    <main className="app-public">
      
        <Suspense fallback={<Spinner/>}>
          <Login link={login_link}/>
        </Suspense>
      
    </main>
  );
}

export default Public;


const Login = ({link}) => {
  const link_resolved = link.read();
  console.log("link status: "+link_resolved.status )
  if (link_resolved.status === "success"){ console.log(console.log("got link: "+link_resolved.data ))
    return (
      <div className="app-container scale-in">
        <FontAwesomeIcon icon={faUser} />
        <h2>Let's explore music!</h2>
        <a href={link_resolved.data} className="app-login-button mt-2">
          Login with <b className="ms-1">Spotify</b> 
          <FontAwesomeIcon className="ms-1" icon={faSpotify} />
        </a>
      </div>
    )
  }else  return <Reconnect onSuccess={()=>console.log("reconnected????")}/> // <Navigate to="/me" replace={true} />
}