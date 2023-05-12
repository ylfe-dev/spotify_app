import './Content.scss';

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { useParams } from "react-router-dom";

import Spinner from '../../components/Spinner'
import { suspensePromise, wait } from '../../utils'

import user  from '../../API/user'

import Playlist from './Playlist'
import Artist from './Artist'
import Album from './Artist'

const  Content = () => {
  const {artist, album, playlist} = useParams();

  return (
    <section className="app-content app-container">

        {playlist? <Playlist id={playlist}/> : null}
        {artist? <Artist id={artist}/> : null}
        {album? <Album id={album}/> : null}
        
    </section>
  );
}

export default Content;

