import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense, useState, useEffect } from 'react';
import "./SquareImage.scss";
import { suspensePromise } from '../utils'

const SquareImage = ({src, className="", radius=0, size="auto"}) => {

  const [blobURL, setBlobURL] = useState(null)

  useEffect(()=>{
    if(src)
      fetch(src)
      .then(res=>res.blob())
      .then(blob=>URL.createObjectURL(blob))
      .then(url => setBlobURL(url)).then(console.log("pobrano obraz"))
  },[src])

  return (
    <div className={"square-image "+className} style={{width:size, height:size, borderRadius:radius}}>   
      {blobURL ? <img src={blobURL}  className="fade-in" /> : <div className="placeholder"></div>  }
    </div>
    )
 
}

export default SquareImage;


/*
const SquareImage = ({src, className="", radius=0, size="auto"}) => {

  if(src){
    const src_promise = suspensePromise(fetch(src).then(res=>res.blob()).then(blob=>URL.createObjectURL(blob)))
    return (
      <div className={"square-image "+className} style={{width:size, height:size, borderRadius:radius}}>
        <Suspense fallback={<div className="placeholder"></div>} >
          <Image 
            className="fade-in" 
            src={src_promise} />
        </Suspense>
      </div>
      )
  }else return null;
}

export default SquareImage;

const Image = ({src, ...props}) =>{
  const blob = src.read();
  return <img src={blob}  {...props}/>

}
*/