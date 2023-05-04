import './Artists.scss'
import { TopArtistList } from '../ArtistList'
import { Suspense, useContext } from 'react'
import { suspensePromise } from '../../utils'
import userAPI  from '../../API/user'

const  Artists = ({className}) => {
  const artists_promise = suspensePromise(userAPI.topArtists());

  return (
    <section className={"user-artists "+className}>
      <h3>Artists</h3>
      <Suspense fallback={<p>loading...</p>}>
        <TopArtistList artists={artists_promise} />
      </Suspense>
    </section>
  );
}

export default Artists;
