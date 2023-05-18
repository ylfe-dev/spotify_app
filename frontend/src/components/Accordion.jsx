import "./Accordion.scss";
import { useState, useRef, useEffect } from "react";

const Accordion = ({ children, className }) => {
  const accordion = useRef(null);

  const setActive = (id) => {
    let grid_rows = "";
    const items = accordion.current.querySelectorAll(".accordion-item");
    items.forEach((item) => {
      if (item.getAttribute("accordion-id") == id) {
        item.classList.add("active");
        grid_rows += "1fr ";
      } else {
        item.classList.remove("active");
        grid_rows += "auto ";
      }
    });
    accordion.current.style.gridTemplateRows = grid_rows;
  };

  useEffect(() => {
    accordion.current
      .querySelectorAll(".accordion-item")
      .forEach(
        (item) =>
          (item.onclick = () => setActive(item.getAttribute("accordion-id")))
      );
  }, []);

  return (
    <div
      ref={accordion}
      className={"accordion " + (className ? className : "")}
    >
      {children}
    </div>
  );
};

export default Accordion;
