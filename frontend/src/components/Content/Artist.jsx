import "./Artist.scss";

import { Suspense, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faEye,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { suspensePromise, wait } from "../../utils";
import { TracksList } from "../TrackList";
import contentAPI from "../../API/content";

import Spinner from "../Spinner";
import SquareImage from "../SquareImage";
import { AuthContext } from "../../ContextProvider";

const Artist = ({ id }) => {
  const { user } = useContext(AuthContext);

  const artist_promise = suspensePromise(contentAPI.artist(id));
  const artistTop_promise = suspensePromise(
    contentAPI.artistTop(id, user.country)
  );
  const artistAlbums_promise = suspensePromise(contentAPI.artistAlbums(id));

  if(process.env.REACT_APP_LOGS==="debug")
    console.log("Artist Content rerender");
  
  return (
    <div className="app-artist">
      <Suspense fallback={<Spinner />}>
        <div className="artist-overview app-tile">
          <ArtistHeader
            fetcher={artist_promise}
            fetcherAlbums={artistAlbums_promise}
          />
          <ArtistTracks fetcher={artistTop_promise} id={id} />
        </div>
        <ArtistAlbums fetcher={artistAlbums_promise} />
      </Suspense>
    </div>
  );
};

export default Artist;

const ArtistHeader = ({ fetcher, fetcherAlbums }) => {
  const artist = fetcher.read();
  const albums = fetcherAlbums.read();

  return artist ? (
    <header>
      
        <SquareImage
          className="artist-image"
          size={120}
          radius={100}
          src={artist.images[0] ? artist.images[0].url : null}
        />
     
      <div className="artist-title">
        <h1>{artist.name}</h1>
      </div>

      <p className="artist-details">
        <span>
          <FontAwesomeIcon icon={faEye} />
          {artist.followers.total}
        </span>
        <span>
          <FontAwesomeIcon icon={faRecordVinyl} />
          {albums.total}
        </span>
      </p>
    </header>
  ) : null;
};

const ArtistTracks = ({ fetcher, id }) => {
  const tracks = fetcher.read();

  return tracks ? (
    <section className="artist-tracklist">
      <h3 className="tracklist-header">
        <span style={{ textAlign: "center" }}>#</span>
        <span></span>
        <span>title</span>
        <span>album</span>
        <span style={{ textAlign: "center" }}>duration</span>
      </h3>
      <div className="scroller">
        <TracksList tracks={tracks.tracks} />
      </div>
    </section>
  ) : null;
};

const ArtistAlbums = ({ fetcher }) => {
  const albums = fetcher.read();
  let years = [];

  albums.items.forEach((album) => {
    const album_year = new Date(album.release_date).getFullYear();
    const found_year = years.findIndex((year) => year.full == album_year);
    if (found_year >= 0) years[found_year].albums.push(album);
    else years.push({ full: album_year, albums: [album] });
  });
  years.sort((a, b) => b.full - a.full);

  return (
    <section className="artist-albums app-tile ">
      <h2>Albums</h2>
      <div className="scroller">
        {years.map((year) => {
          return (
            <div key={year.full}>
              <h3 className="albums-year-title">{year.full}</h3>
              <div className="albums-year">
                {year.albums.map((album) => (
                  <ArtistAlbum key={album.id} info={album} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ArtistAlbum = ({ info }) => {
  const navigate = useNavigate();

  function clickArtistHandler(ev, id) {
    ev.stopPropagation();
    navigate("/artist/" + id);
  }

  function clickAlbumHandler() {
    navigate("/album/" + info.id);
  }

  return info && info.name ? (
    <article className="artist-album" onClick={clickAlbumHandler}>
      {info.images ? (
        <SquareImage
          className="album-image"
          size={120}
          radius={10}
          src={info.images[0].url}
        />
      ) : null}
      <h3>{info.name}</h3>
      <p className="album-artists">
        {info.artists.map((artist) => (
          <span
            key={artist.id}
            onClick={(ev) => clickArtistHandler(ev, artist.id)}
          >
            {artist.name}
          </span>
        ))}
      </p>
      <p className="album-details">
        <span>
          <FontAwesomeIcon icon={faRecordVinyl} />
          {info.album_type}
        </span>
        <span>
          <FontAwesomeIcon icon={faMusic} />
          {info.total_tracks}
        </span>
      </p>
    </article>
  ) : null;
};
