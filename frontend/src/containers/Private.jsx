import './Private.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import Spinner from '../components/Spinner'
import {suspensePromise, wait} from '../utils'

import Me from "../components/Me"
import Content from "../components/Content"
import About from "../components/About"



const Private = () => {
  console.log("Private rerender")

  return (
    <main className="app-private">
      <Me />
      <Content />
    </main>
  );
}

export default Private;

