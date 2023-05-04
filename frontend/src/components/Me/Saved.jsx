import './Saved.scss'
import { StaticTrackList } from '../TrackList'
import { Suspense, useContext } from 'react'
import {suspensePromise, wait} from '../../utils'
import userAPI  from '../../API/user'

const  Saved = ({className}) => {
  const saved_promise = suspensePromise(userAPI.saved());

  return (
    <section className={"user-saved "+className}>
      <h3>Saved</h3>
      <Suspense fallback={<p>loading...</p>}>
        <StaticTrackList tracks={saved_promise} image />
      </Suspense>
    </section>
  );
}

export default Saved;
