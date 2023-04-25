import './TrackList.scss';

import { Suspense, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import Spinner from './Spinner'
import SquareImage from './SquareImage'

import { suspensePromise, wait } from '../utils'
import { AuthContext } from "../ContextProvider";

import user  from '../API/user'



const  TrackList = ({tracks, indexed, dynamic, limit}) => {
  const tracks_obj = tracks.read().data;


  if(!dynamic) return (
    <ol className={"track-list "+(indexed ? "" : "no-index")}>
      {tracks_obj.items.map((item, index)=> {
        return index >= limit ? null : <Track 
          key={index}
          image={item.track.album.images[item.track.album.images.length-1].url}
          name={item.track.name}
          artists={item.track.artists}
          id={item.track.id}
          />
        })}
    </ol>
  )
  else return null;
}

export default TrackList;



const Track = ({name, artists, id, image, album, count}) => {
  console.log("artists: "+artists)
  return (
    <li>
      {image ? <SquareImage className="track-image" radius="10px" src={image} /> : null}
      <div className="track-title">
        <h5 className="track-name">{name}</h5>
        <p className="track-artists">{artists.map(artist=><span>{artist.name}</span>)}</p>
      </div>
      {!album || <p className="track-album">{album}</p>}
      {!count || <p className="track-count">{countUnits(count)}</p>}
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