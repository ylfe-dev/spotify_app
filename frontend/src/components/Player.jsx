import "./Player.scss";

import { Suspense, useContext, useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faDesktop,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { ThemeContext, PlayerContext } from "../ContextProvider";

import { QueueTrackList, RecentlyTrackList } from "./TrackList";
import { suspensePromise } from "../utils";
import SquareImage from "./SquareImage";
import Spinner from "./Spinner";
import userAPI from "../API/user";

const Player = ({ className }) => {
  if(process.env.REACT_APP_LOGS==="debug")
    console.log("player rerender");

  const { player, playerActions } = useContext(PlayerContext);

  const memoPlayer = useMemo(
    () => (
      <>
        <PlayerHistory
          freshness={player && player.item ? player.item.id : null}
        />
        <div className="app-player app-tile">
          {typeof player !== undefined ? (
            (!player || !player.item ) ? (
              <SelectDevice playerActions={playerActions} />
            ) : (
              <PlayerTile playerActions={playerActions} player={player} />
            )
          ) : (
            <Spinner />
          )}
        </div>
        <PlayerQueue
          freshness={player && player.item ? player.item.id : null}
        />
      </>
    ),
    [player]
  );

  return (
    <section className={"app-player-container " + className}>
      {memoPlayer}
    </section>
  );
};

export default Player;

const PlayerTile = ({ playerActions, player }) => {
  return (
    <>
      <PlayerTrackInfo
        name={player.item.name}
        image={player.item.album.images[0].url}
        artists={player.item.artists}
      />
      <PlayerControls
        playing={player.is_playing}
        playerActions={playerActions}
      />
    </>
  );
};



const SelectDevice = ({ playerActions }) => {
  const [devices, setDevices] = useState(undefined);

  useEffect(() => {
    function fetchDevices() {
      userAPI.devices().then((fetched_devices) => setDevices(fetched_devices));
    }

    const reload = setInterval(fetchDevices, 5000);
    fetchDevices();

    return () => clearInterval(reload);
  }, []);

  function clickDeviceHandler(id) {
    playerActions.initDevice(id);
  }

  return typeof devices === "undefined" ? (
    <Spinner />
  ) : (
    <div className="device-select">
      {devices.devices.length > 0 ? (
        <h4>Select device:</h4>
      ) : (
        <p>No active devices</p>
      )}
      {devices.devices.map((device) => (
        <button
          key={device.id}
          className="device"
          onClick={() => clickDeviceHandler(device.id)}
        >
          <FontAwesomeIcon
            icon={device.type == "Computer" ? faDesktop : faMobileScreen}
          />
          {device.name}
        </button>
      ))}
    </div>
  );
};



const PlayerControls = ({ playing, playerActions }) => {
  const handleSkipPrev = (ev) => playerActions.prev();
  const handleSkipNext = (ev) => playerActions.next();
  const handleResume = (ev) => playerActions.resume();
  const handlePause = (ev) => playerActions.pause();

  return (
    <div className="player-controls">
      <button onClick={handleSkipPrev}>
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>
      <button onClick={playing ? handlePause : handleResume}>
        <FontAwesomeIcon icon={playing ? faPause : faPlay} />
      </button>
      <button onClick={handleSkipNext}>
        <FontAwesomeIcon icon={faForwardStep} />
      </button>
    </div>
  );
};



const PlayerTrackInfo = ({ name, artists, image }) => {
  const navigate = useNavigate();
  const { setTheme } = useContext(ThemeContext);
  useEffect(() => setTheme({ image: image }), [image]);

  const clickHandler = (id) => navigate("/artist/" + id);

  return (
    <>
      <SquareImage className="player-image" radius={10} src={image} />
      <div className="player-title">
        <h4>{name}</h4>
        <h5>
          {artists.map((artist) => (
            <button key={artist.id} onClick={() => clickHandler(artist.id)}>
              {artist.name}
            </button>
          ))}
        </h5>
      </div>
    </>
  );
};



const PlayerHistory = ({ freshness }) => {
  const [recent, setRecent] = useState(null);

  useEffect(() => {
    userAPI
      .recentlyPlayed()
      .then((fetched_recent) => setRecent(fetched_recent));
  }, [freshness]);

  return recent ? (
    <div className="player-recent app-tile">
      <RecentlyTrackList
        tracks={Array.from(recent.items).reverse()}
        image
        context={false}
      />
    </div>
  ) : null;
};




const PlayerQueue = ({ freshness }) => {
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    userAPI.queue().then((fetched_queue) => setQueue(fetched_queue));
  }, [freshness]);

  return queue ? (
    <div className="player-queue app-tile">
      {queue.queue[0] ? (
        <QueueTrackList tracks={queue.queue} image context={false} />
      ) : (
        <p>No active queue</p>
      )}
    </div>
  ) : null;
};
