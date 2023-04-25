import './Me.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import Spinner from '../../components/Spinner'
import { suspensePromise, wait } from '../../utils'
import { AuthContext } from "../../ContextProvider";

import user  from '../../API/user'

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

