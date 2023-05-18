import "./Content.scss";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { suspensePromise, wait } from "../../utils";

import user from "../../API/user";

import Playlist from "./Playlist";
import Artist from "./Artist";
import Album from "./Album";
import Home from "./Home";

const Content = ({ className }) => {
  const { artist, album, playlist } = useParams();

  const content = useMemo(
    () => (
      <>
        {playlist ? <Playlist id={playlist} /> : null}
        {artist ? <Artist id={artist} /> : null}
        {album ? <Album id={album} /> : null}
        {!(album || playlist || artist) ? <Home /> : null}
      </>
    ),
    [artist, album, playlist]
  );

  return (
    <section className={"app-content app-container " + className}>
      {content}
    </section>
  );
};

export default Content;
