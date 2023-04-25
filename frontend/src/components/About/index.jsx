import './About.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import Spinner from '../../components/Spinner'
import { suspensePromise, wait } from '../../utils'

import user  from '../../API/user'




const  About = () => {

  return (
    <section className="app-about app-container">
     
        <h3> About</h3>
      
    </section>
  );
}

export default About;

