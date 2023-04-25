import { Suspense, useContext } from 'react'
import { useLocation, Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import Spinner from '../components/Spinner'
import {suspensePromise, wait} from '../utils'

import userAPI from '../API/user'
import './OAuth.scss';
import { AuthContext } from "../ContextProvider";


function OAuth() {
  const oauth_query = useLocation().search || "";
  const oauth_response = suspensePromise(userAPI.oauth(oauth_query));

  return (
    <main className="app-oauth">
      <div className="app-container">
        <Suspense fallback={<><Spinner/><h2>Logowanie</h2></>}>
          <Alert data={oauth_response}/>
        </Suspense>
      </div>
    </main>
  );
}

export default OAuth;

const Alert = ({data}) => {
  const userContext = useContext(AuthContext)
  const login = data.read();
  console.log("oAuth api: "+ JSON.stringify(login))

  if(login.status === "success"){
    userContext.setUser(login.data);
    return <Navigate to="/me" replace={true} />
  } else
    return( 
      <>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h2>Login failed</h2>
        <Link className="app-button rb" to={"/"}>return</Link>
      </>
    )
}




