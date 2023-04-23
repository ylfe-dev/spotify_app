import {Outlet, useParams, useLoaderData, Await} from "react-router-dom";
import {useEffect, useState, Suspense} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


import './App.css';

import Background from './components/Background'


function App() {
  const {artist, album} = useParams();

  const [data, setData] = useState()
  useEffect(()=>{
    fetch("/login")
    .then(data => data.json())
    .then(json => console.log(json))
  },[])


  return (
    <>
      <Background />
      <h1>HelloWorld</h1>
      <FontAwesomeIcon className = "load-spinner" icon={faSpinner} />
      <p>{artist? "artist: "+artist : ""}</p>
      <p>{album? "album: "+album : ""}</p> 
    </>
  );
}

export default App;
