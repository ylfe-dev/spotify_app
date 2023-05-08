import './Saved.scss'
import { StaticTrackList } from '../TrackList'
import { Suspense, useContext } from 'react'
import {suspensePromise, wait} from '../../utils'
import userAPI  from '../../API/user'

const  Saved = ({className, ...props}) => {
  const saved_promise = suspensePromise(userAPI.saved());

  return (
    <section className={"user-saved "+className} {...props}>
      <h3>Saved</h3>
      <Suspense fallback={<p>loading...</p>}>
        <StaticTrackList tracks={saved_promise} image className="collapse" />
      </Suspense>
    </section>
  );
}

export default Saved;