import "./Accordion.scss"
import { useState, useRef, useEffect } from 'react'

const  Accordion = ({ children}) => {

  const accordion = useRef(null);

  const setActive = id => {
     accordion.current.querySelectorAll('.accordion-item').forEach(item =>{
      if(item.getAttribute("accordion-id") == id)
        item.classList.add('active');
      else
        item.classList.remove('active');
     })
  }

  useEffect(()=>{
    accordion.current.querySelectorAll('.accordion-item')
    .forEach(item =>
      item.onclick = () => setActive(item.getAttribute("accordion-id"))
    )
  },[])

  return (
    <div ref={accordion} className="accordion">
      {children}
    </div>
  );
}

export default Accordion;