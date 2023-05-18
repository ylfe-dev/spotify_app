import { useState, useEffect, useRef, useContext } from "react";
import userAPI from "../API/user";
import { PlayerContext } from "../ContextProvider";

const usePlayer = () => {
  const { setPlayer } = useContext(PlayerContext);

  const actions = useRef({
    pause: () => userAPI.playerPause().then(setTimeout(updatePlayer, 1000)),
    resume: () => userAPI.playerResume().then(setTimeout(updatePlayer, 1000)),
    next: () => userAPI.playerNext().then(updatePlayer),
    prev: () => userAPI.playerPrev().then(setTimeout(updatePlayer, 1000)),
    play: (context, id) =>
      userAPI.playerPlay(context, id).then(setTimeout(updatePlayer, 1000)),
    update: () => updatePlayer(),
  });

  function updatePlayer() {
    console.log("🎵 player context update");
    userAPI.player().then((new_player) => setPlayer(new_player));
  }

  return actions.current;
};

export default usePlayer;
