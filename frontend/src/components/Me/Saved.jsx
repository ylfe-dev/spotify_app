import './Saved.scss'
import TrackList from '../TrackList'
import { Suspense, useContext } from 'react'
import {suspensePromise, wait} from '../../utils'
import userAPI  from '../../API/user'

const  Saved = () => {
  const saved_promise = suspensePromise(userAPI.saved());
  return (
    <section className="user-saved">
      <h3>Saved</h3>
      <Suspense fallback={"loading..."}>
        <TrackList tracks={saved_promise} limit={3}  />
      </Suspense>
    </section>
  );
}

export default Saved;
