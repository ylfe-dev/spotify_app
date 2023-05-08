import './TrackList.scss';

import { Suspense, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import Spinner from './Spinner'
import SquareImage from './SquareImage'

import { suspensePromise, wait } from '../utils'
import { AuthContext } from "../ContextProvider";

import user  from '../API/user'




export const  StaticTrackList = ({tracks, limit=99, indexed, image, album, popularity, duration, context=false, className}) => {

  const tracks_obj = tracks.read();
  if(tracks_obj) 
    return (
      <div className={"track-scroller scroller " + className}>
        <ol className={"track-list "+(indexed ? "" : "no-index")}>
          {tracks_obj.items.map((item, index)=> {
            if( index < limit) 
              return <Track 
                key={index}
                className="no-details"
                name={item.track.name}
                artists={item.track.artists} 
                id={item.track.id} 
                image={image ? item.track.album.images[item.track.album.images.length-1].url : false}
                album={album ? item.track.album.name: false}
                popularity={popularity? item.track.popularity : false}
                duration={duration ? item.track.duration_ms/1000 : false}
                context={context}/>
          })}
        </ol>
      </div>
    );
  else 
    return null;
}




export const  TrackList = ({tracks, context=false}) => {

    return (
    <ol  type="1" className="track-list">
      {tracks.map((item, index)=> <Track 
          key={index}
          ordnum={index+1}
          image={item.track.album.images[item.track.album.images.length-1].url}
          name={item.track.name}
          artists={item.track.artists}
          id={item.track.id}
          duration={item.track.duration_ms/1000}
          album={item.track.album}
          context={context}
          />
        )}
    </ol>
  )
}

export default TrackList;



const Track = ({className, name, artists, id, image, album, duration, ordnum, context=false}) => { 
  const clickArtistHandler = (event, artist_id) =>{
    console.log("artist: "+artist_id)
  }

  const clickPlayHandler = (event) =>{
    console.log("context: "+context+", id: "+id)
    user.playerPlay(context, id);
  }

   const clickAlbumHandler = (event) =>{
    console.log("album: "+album.id)
  }

  return (
    <li className={className}>
      <button 
        className="play-button"
        onClick={clickPlayHandler}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <div className="before-title">
        {ordnum ? <p className="order-number">{ordnum}</p> : null}
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
        {album ? <button onClick={clickAlbumHandler} className="track-album">{album.name}</button> : null}
        {duration ? <p className="track-duration">{countTime(duration)}</p> : null}
      </div>
    </li>
  )
}

const countTime = s => {

  const minutes = Math.floor(s/60);
  const seconds = Math.floor(s - minutes*60);

  let time_string = minutes;
  time_string +=   minutes < 10 ? ":" + (seconds < 10 ? "0" + seconds : seconds) : ""; 
  time_string += " min"

  return time_string;
}