import './PlaylistList.scss';

import { Suspense, useState } from 'react'
import { useNavigate } from "react-router-dom";

import Spinner from './Spinner'
import SquareImage from './SquareImage'

import { suspensePromise } from '../utils'


import user  from '../API/user'




export const  PlaylistList = ({playlists, image=false}) => {

  const playlists_obj = playlists.read();

  if(playlists_obj) 
    return (
      <div className="playlists-scroller scroller">
        <ol className="playlists-list">
          {playlists_obj.items.map((item, index)=> 
             <Playlist 
                key={index}
                name={item.name}
                id={item.id} 
                tracks={item.tracks.total}
                image={image ? item.images : false}/>
          )}
        </ol>
      </div>
    );
  else 
    return null;
}





const Playlist = ({name, id, image, tracks}) => { 
  const navigate = useNavigate();

  const clickHandler = (event) =>{
    event.stopPropagation();
    navigate("/playlist/"+id)
  }

  return (
    <li>
      <button className="playlist-button" onClick={clickHandler}>
        {image ? <SquareImage className="playlist-image" radius="10px" src={image[0].url} /> : null}
        <h5 className="playlist-name">{name}</h5>
        <p className="playlist-tracks">{tracks}</p>
       </button>
    </li>
  )
}
