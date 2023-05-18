import "./Background.scss";
import { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext } from "../ContextProvider";

const Background = () => {
  const { theme } = useContext(ThemeContext);
  const [layer, setLayer] = useState(false);
  const [image, setImage] = useState({ under: basic_background, over: null });

  useEffect(() => {
    if (theme && theme.image)
      fetch(theme.image)
        .then((data) => data.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => changeBackground(url));
  }, [theme]);

  const changeBackground = (url) => {
    const new_layer = layer ? { under: url } : { over: url };
    setImage({ ...image, ...new_layer });
    setLayer(!layer);
  };

  console.log("background rerender");

  return (
    <>
      <div id="app-background">
        <div style={{ backgroundImage: "url(" + image.under + ")" }}></div>
        <div
          style={{
            opacity: layer ? 1 : 0,
            backgroundImage: "url(" + image.over + ")",
          }}
        ></div>
      </div>
    </>
  );
};

export default Background;

const basic_background =
  "data:image/png;base64,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";
