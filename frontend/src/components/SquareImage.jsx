import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Suspense } from 'react';
import "./SquareImage.scss";
import { suspensePromise, wait } from '../utils'

const SquareImage = ({src, className, radius=0, size="auto"}) => {

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