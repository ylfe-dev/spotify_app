import "./ArtistList.scss";

import { Suspense, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";
import SquareImage from "./SquareImage";

import { suspensePromise, wait } from "../utils";
import { AuthContext } from "../ContextProvider";

import user from "../API/user";

export const ArtistList = ({ artists, limit = 99 }) => {
  const artists_obj = artists.read().artists;

  if (artists_obj)
    return (
      <ul className="artist-list">
        {artists_obj.items.map((item, index) => {
          if (index < limit)
            return (
              <Artist
                key={index}
                name={item.name}
                id={item.id}
                followers={item.followers}
                image={item.images[item.images.length - 1].url}
              />
            );
        })}
      </ul>
    );
  else return null;
};

export const TopArtistList = ({ artists, limit = 99, className }) => {
  const artists_obj = artists.read();
  const scroller = useRef();
  const wheelHandler = (ev) => (scroller.current.scrollLeft += ev.deltaY);

  if (artists_obj)
    return (
      <div
        ref={scroller}
        onWheel={wheelHandler}
        className={"artist-scroller scroller " + className}
      >
        <ul className="artist-list">
          {artists_obj.items.map((item, index) => {
            if (index < limit)
              return (
                <Artist
                  key={index}
                  name={item.name}
                  id={item.id}
                  image={item.images[item.images.length - 1].url}
                />
              );
          })}
        </ul>
      </div>
    );
  else return null;
};

const Artist = ({ name, id, image }) => {
  const navigate = useNavigate();

  const clickHandler = () => navigate("/artist/" + id);

  return (
    <li>
      <button onClick={clickHandler}>
        <SquareImage className="artist-image" radius="100px" src={image} />
        <div className="artist-title">
          <h5 className="artist-name">{name}</h5>
        </div>
      </button>
    </li>
  );
};
