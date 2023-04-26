import './Saved.scss'
import { StaticTrackList } from '../TrackList'
import { Suspense, useContext } from 'react'
import {suspensePromise, wait} from '../../utils'
import userAPI  from '../../API/user'

const  Saved = () => {
  const saved_promise = suspensePromise(userAPI.saved());

  return (
    <section className="user-saved">
      <h3>Saved</h3>
      <Suspense fallback={<p>loading...</p>}>
        <StaticTrackList tracks={saved_promise} limit={10} image   />
      </Suspense>
    </section>
  );
}

export default Saved;
