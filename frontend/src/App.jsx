import './App.scss';

import { useParams, useLoaderData, useLocation } from "react-router-dom";
import {useEffect, useState, Suspense, useContext} from 'react'

import { AuthContext } from "./ContextProvider";
import { suspensePromise, wait } from './utils'

import Background from './components/Background'
import Spinner from './components/Spinner'
import Private from './containers/Private'
import Public from './containers/Public'




const App = ({refresh_user}) => {

  const userContext = useContext(AuthContext);
  const {artist, album} = useParams();

 
  

  

  if(userContext.user)  return <Private />
  else                  return <Public />
 
}

export default App;




