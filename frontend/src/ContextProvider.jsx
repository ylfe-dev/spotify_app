import { useState, useReducer, useEffect, useRef, useMemo } from "react";
import { createContext } from "react";
import userAPI from "./API/user";

export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);
export const PlayerContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("🔒 Auth context rerender");
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("🎴 Theme context rerender");
  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const PlayerProvider = ({ children }) => {
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("🎵 Player context rerender");

  const spotifyUpdateTime = 1500;
  const updateIntervalTime = 20000;

  const updateTimeout = useRef();
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    updatePlayer();
    return () => clearTimeout(updateTimeout.current);
  }, []);

  const actions = {
    pause: () =>
      userAPI.playerPause().then(setTimeout(updatePlayer, spotifyUpdateTime)),
    resume: () =>
      userAPI.playerResume().then(setTimeout(updatePlayer, spotifyUpdateTime)),
    next: () =>
      userAPI.playerNext().then(setTimeout(updatePlayer, spotifyUpdateTime)),
    prev: () =>
      userAPI.playerPrev().then(setTimeout(updatePlayer, spotifyUpdateTime)),
    play: (context, id) => player ? 
        userAPI
        .playerPlay(context, id)
        .then(setTimeout(updatePlayer, spotifyUpdateTime))
        : null,
    initDevice: (id) =>
      userAPI.initDevice(id).then(setTimeout(updatePlayer, spotifyUpdateTime)),
    update: () => updatePlayer(),
  };

  function updatePlayer() {
    userAPI.player().then((new_player) => setPlayer(new_player));
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setInterval(updatePlayer, updateIntervalTime);
  }

  return (
    <PlayerContext.Provider value={{ player: player, playerActions: actions }}>
      {children}
    </PlayerContext.Provider>
  );
};
