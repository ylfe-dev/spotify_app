import './Saved.scss'
import { Suspense, useContext } from 'react'
import { StaticTrackList } from '../TrackList'


import { AuthContext } from "../../ContextProvider";
import {suspensePromise, wait} from '../../utils'
import userAPI  from '../../API/user'

const  Saved = ({className, ...props}) => {
  const saved_promise = suspensePromise(userAPI.saved());
  const { user } = useContext(AuthContext);
  return (
    <section className={"user-saved "+className} {...props}>
      <h3>Saved</h3>
      <Suspense fallback={<p>loading...</p>}>
        <StaticTrackList tracks={saved_promise} image className="collapse" context={user.uri+":collection"}/>
      </Suspense>
    </section>
  );
}

export default Saved;
