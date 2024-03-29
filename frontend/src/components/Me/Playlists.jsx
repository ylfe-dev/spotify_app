import "./Playlists.scss";
import { PlaylistList } from "../PlaylistList";
import { Suspense, useContext } from "react";
import { suspensePromise } from "../../utils";
import userAPI from "../../API/user";

const Playlists = ({ className, ...props }) => {
  const playlists_promise = suspensePromise(userAPI.playlists());

  return (
    <section className={"user-playlists " + className} {...props}>
      <h3>Playlists</h3>
      <Suspense fallback={<p>loading...</p>}>
        <PlaylistList playlists={playlists_promise} className="collapse" />
      </Suspense>
    </section>
  );
};

export default Playlists;
