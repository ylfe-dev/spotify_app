import './Background.scss';
import { useState, useEffect } from 'react'

function Background() {

  const [leyer, setLeyer] = useState(false)
  const [image, setImage] = useState()

  useEffect(()=>{
    fetch("https://i.scdn.co/image/ab67706f000000030e468f56062f74309b22d63d")
    .then(data => data.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => setImage(url))
    
 
  },[])


  return (
    <div id="app-background">
      <div style={{opacity: !leyer, backgroundImage: "url("+image+")"}}></div>
      <div style={{opacity: leyer}}></div>
    </div>
  );
}

export default Background;
