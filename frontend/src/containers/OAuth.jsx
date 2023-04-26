import './OAuth.scss';

import { Suspense, useContext, useEffect } from 'react'
import { useLocation, Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../components/Spinner'
import {suspensePromise, wait} from '../utils'

import oauthAPI from '../API/oauth'
import { AuthContext } from "../ContextProvider";


function OAuth() {
  const oauth_query = useLocation().search || false;
  const { user } = useContext(AuthContext)

  if(oauth_query && !user){
    const oauth_response = suspensePromise(oauthAPI.auth(oauth_query));
    return (
      <main className="app-oauth">
        <div className="app-container">
          <Suspense fallback={<><Spinner/><h2>Logowanie</h2></>}>
            <Alert auth={oauth_response}/>
          </Suspense>
        </div>
      </main>
    );
  } else return <Navigate to="/" replace={true} />
}

export default OAuth;

const Alert = ({auth}) => {
  const { setUser } = useContext(AuthContext)
  const login = auth.read();

  useEffect(()=>{
    if(login && login.user) 
      setUser(login.user);
  },[])

   
  if(!login || !login.user)
    return( 
      <>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h2>Login failed</h2>
        <Link className="app-button rb" to={"/"}>return</Link>
      </>
    )
  else return null
}




