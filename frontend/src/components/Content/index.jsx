import './Content.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import Spinner from '../../components/Spinner'
import { suspensePromise, wait } from '../../utils'

import user  from '../../API/user'




const  Content = () => {

  return (
    <section className="app-content app-container">
     
        <h3> Content</h3>
      
    </section>
  );
}

export default Content;

