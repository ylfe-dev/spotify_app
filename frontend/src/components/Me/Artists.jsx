import "./Artists.scss";
import { TopArtistList } from "../ArtistList";
import { Suspense, useContext } from "react";
import { suspensePromise } from "../../utils";
import userAPI from "../../API/user";

const Artists = ({ className, ...props }) => {
  const artists_promise = suspensePromise(userAPI.topArtists());

  return (
    <section className={"user-artists " + className} {...props}>
      <h3>Artists</h3>
      <Suspense fallback={<p>loading...</p>}>
        <TopArtistList artists={artists_promise} className="collapse" />
      </Suspense>
    </section>
  );
};

export default Artists;
