import "./Playlist.scss";

import { Suspense, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faLockOpen,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { suspensePromise } from "../../utils";

import TrackList from "../TrackList";
import contentAPI from "../../API/content";
import { PlaylistList } from "../PlaylistList";
import Spinner from "../Spinner";
import SquareImage from "../SquareImage";

const Playlist = ({ id }) => {
  const playlists_promise = suspensePromise(contentAPI.playlist(id));
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("Playlist rerender");
  return (
    <div className="app-playlist">
      <Suspense fallback={<Spinner />}>
        <PlaylistHeader fetcher={playlists_promise} />
        <PlaylistTracks fetcher={playlists_promise} />
      </Suspense>
    </div>
  );
};

export default Playlist;

const PlaylistHeader = ({ fetcher, className }) => {
  const playlist = fetcher.read();

  if(process.env.REACT_APP_LOGS==="debug")
    console.log("Playlist header rerender");

  return playlist ? (
    <header className={className}>
      {playlist.images[0] ? (
        <SquareImage
          className="playlist-image"
          size={180}
          radius={10}
          src={playlist.images[0].url}
        />
      ) : null}

      <div className="playlist-title">
        <h1>{playlist.name}</h1>
        <p className="playlist-owner">
          {playlist.owner.display_name}'s playlist
        </p>
        {playlist.description ? (
          <p className="playlist-description">{playlist.description}</p>
        ) : null}
      </div>

      <p className="playlist-details">
        <span>
          <FontAwesomeIcon icon={faEye} />
          {playlist.followers.total}
        </span>
        <span>
          <FontAwesomeIcon icon={playlist.public ? faLockOpen : faLock} />
          {playlist.public ? "public" : "private"}
        </span>
        <span>
          <FontAwesomeIcon icon={faMusic} />
          {playlist.tracks.total}
        </span>
      </p>
    </header>
  ) : null;
};

const PlaylistTracks = ({ fetcher }) => {
  const playlist = fetcher.read();
  return (
    <section className="playlist-tracklist app-tile">
      <h3 className="tracklist-header">
        <span style={{ textAlign: "center" }}>#</span>
        <span></span>
        <span>title</span>
        <span>album</span>
        <span style={{ textAlign: "center" }}>duration</span>
      </h3>
      <div className="scroller">
        <TrackList tracks={playlist.tracks.items} context={playlist.uri} />
      </div>
    </section>
  );
};
