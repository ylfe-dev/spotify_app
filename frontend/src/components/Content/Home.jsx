import "./Home.scss";

import { Suspense, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { suspensePromise, wait } from "../../utils";

import userAPI from "../../API/user";

import SquareImage from "../SquareImage";

const Home = () => {
  const featured_promise = suspensePromise(userAPI.featured());

  return (
    <div className="app-home">
      <Suspense fallback={<Spinner />}>
        <Featured fetcher={featured_promise} />
      </Suspense>
    </div>
  );
};

export default Home;

const Featured = ({ fetcher }) => {
  const { message, playlists } = fetcher.read();

  return (
    <div className="home-featured app-tile">
      <div className="scroller">
        <h1>{message}</h1>
        <div className="tiles">
          {playlists.items.map((playlist) => (
            <PlaylistTile key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlaylistTile = ({ playlist }) => {
  const navigate = useNavigate();
  function handlePlaylistClick() {
    navigate("/playlist/" + playlist.id);
  }

  return (
    <article className="playlist-tile" onClick={handlePlaylistClick}>
      {playlist.images[0] ? (
        <SquareImage
          className="tile-image"
          src={playlist.images[0].url}
          size={150}
          radius={10}
        />
      ) : null}
      <div className="playlist-title">
        <h3>{playlist.name}</h3>
        <p>{playlist.description}</p>
      </div>
    </article>
  );
};
