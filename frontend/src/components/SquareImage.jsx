import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useState, useEffect, useRef } from "react";
import "./SquareImage.scss";
import { suspensePromise } from "../utils";

const SquareImage = ({ src=false, className = "", radius = 0, size = "auto" }) => {
  const imageSRC = useRef(null);
  const [blobURL, setBlobURL] = useState(null);

  useEffect(() => {
    setBlobURL(null);

    if (src)
      fetch(src)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => setBlobURL(url))
        .then((imageSRC.current = src));
  }, [src]);

  return (
    <div
      className={"square-image " + className}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {blobURL && src == imageSRC.current ? (
        <img src={blobURL} className="fade-in" />
      ) : (
        <div className="placeholder"></div>
      )}
    </div>
  );
};

export default SquareImage;
