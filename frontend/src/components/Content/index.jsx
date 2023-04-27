import './Content.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useParams } from "react-router-dom";

import Spinner from '../../components/Spinner'
import { suspensePromise, wait } from '../../utils'

import user  from '../../API/user'

import Playlist from './Playlist'


const  Content = () => {
  const {artist, album, playlist} = useParams();

  return (
    <section className="app-content app-container">

        {playlist? <Playlist id={playlist}/> : null}
      
    </section>
  );
}

export default Content;

