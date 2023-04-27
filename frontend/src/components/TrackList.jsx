import './TrackList.scss';

import { Suspense, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import Spinner from './Spinner'
import SquareImage from './SquareImage'

import { suspensePromise, wait } from '../utils'
import { AuthContext } from "../ContextProvider";

import user  from '../API/user'




export const  StaticTrackList = ({tracks, limit=99, indexed, image, album, popularity, duration}) => {

  const tracks_obj = tracks.read();
  if(tracks_obj) 
    return (
      <div className="track-scroller scroller">
        <ol className={"track-list "+(indexed ? "" : "no-index")}>
          {tracks_obj.items.map((item, index)=> {
            if( index < limit) 
              return <Track 
                key={index}
                name={item.track.name}
                artists={item.track.artists} 
                id={item.track.id} 
                image={image ? item.track.album.images[item.track.album.images.length-1].url : false}
                album={album ? item.track.album.name: false}
                popularity={popularity? item.track.popularity : false}
                duration={duration ? item.track.duration_ms/1000 : false}/>
          })}
        </ol>
      </div>
    );
  else 
    return null;
}




export const  TrackList = ({collection}) => {
  const resolved_collection = collection.read().tracks;
  console.log(resolved_collection)
  if(resolved_collection) 
    return (
    <ol className="track-list">
      {resolved_collection.items.map((item, index)=> <Track 
          key={index}
          image={item.track.album.images[item.track.album.images.length-1].url}
          name={item.track.name}
          artists={item.track.artists}
          id={item.track.id}
          duration={item.track.duration_ms/1000}
          album={item.track.album.name}
          />
        )}
    </ol>
  )
  else return null;
}

export default TrackList;



const Track = ({name, artists, id, image, album, duration}) => { 
  const clickArtistHandler = (event, artist_id) =>{
    event.stopPropagation();
    console.log("artist: "+artist_id)
  }

  const clickPlayHandler = (event) =>{
    event.stopPropagation();
    console.log("play track: "+id)
  }

  return (
    <li>
      <button 
        className="play-button"
        onClick={clickPlayHandler}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <div className="before-title">
        {image ? <SquareImage className="track-image" radius="10px" src={image} /> : null}
      </div>
      <div className="track-title">
        <h5 className="track-name">{name}</h5>
        <p className="track-artists">
          {artists.map((artist, index) => 
            <span 
            key={index} 
            onClick={(e)=>clickArtistHandler(e, artist.id)}>
              {artist.name}
            </span>
            )}
        </p>
      </div>
      <div className="after-title">
        {album ? <p className="track-album">{album}</p> : null}
        {duration ? <p className="track-count">{countUnits(duration)}</p> : null}
      </div>
    </li>
  )
}

const countUnits = count =>{
  const units = ["", "k", "m", "g"];
  let exp = 0;
  let n = count;
  while(n>1000){
    n /= 1000;
    exp++;
  }
  return n+units[exp];
}