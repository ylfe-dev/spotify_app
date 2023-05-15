import './Player.scss'

import { Suspense, useContext, useEffect, useState, useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { ThemeContext, PlayerContext } from "../ContextProvider"

import { QueueTrackList, RecentlyTrackList } from './TrackList'
import { suspensePromise } from '../utils'
import SquareImage from './SquareImage'
import Spinner from './Spinner'
import userAPI  from '../API/user'



const Player = ({className}) =>{
	console.log("player rerender")

	const {player, playerActions}  = useContext(PlayerContext)




	return  (
		<section className="app-player-container">
			<PlayerHistory />
			<div className={"app-player "+className}>
				{player ? 
				<>
					<PlayerTrackInfo 
						name={player.item.name}
						image={player.item.album.images[0].url}
						artists={player.item.artists} />
					<PlayerControls 
						playing={player.is_playing} 
						playerActions={playerActions}/> 
				</>
				: <Spinner/>  
				}
			</div>
			<PlayerQueue />
		</section>
	)
}

export default Player;





const PlayerControls = ({playing, playerActions}) => {

	const handleSkipPrev = ev => playerActions.prev();
	const handleSkipNext = ev => playerActions.next();
	const handleResume = ev => playerActions.resume();
	const handlePause = ev => playerActions.pause();

	return (
		<div className="player-controls">
			<button onClick={handleSkipPrev} ><FontAwesomeIcon icon={faBackwardStep} /></button>
			<button onClick={playing ? handlePause : handleResume} >
				<FontAwesomeIcon icon={playing ? faPause : faPlay} />
			</button>
			<button onClick={handleSkipNext} ><FontAwesomeIcon icon={faForwardStep} /></button>
		</div>
	)
}




const PlayerTrackInfo = ({name, artists, image}) => {
	const navigate = useNavigate();
	const { setTheme } = useContext(ThemeContext)
	useEffect(()=>setTheme({image:image}),[image])

	const clickHandler = id => navigate("/artist/"+id)

	return (
		<>
			<SquareImage className="player-image" radius={10} src={image} />
			<div className="player-title">
				<h4>{name}</h4>
				<h5>{artists.map(artist => <button key={artist.id} onClick={()=>clickHandler(artist.id)}>{artist.name}</button>)}</h5>
			</div>
		</>
	)	
}



const PlayerHistory = ({freshness}) => {
	const [recent, setRecent] = useState(null)

	useEffect(()=>{
		userAPI.recentlyPlayed().then(fetched_recent => setRecent(fetched_recent))
	},[freshness])
	
	return recent ? (
		<div className="player-recent app-tile">
			<RecentlyTrackList tracks={recent.items} image  context={false}/>
		</div>
	) : null;
}





const PlayerQueue = ({freshness}) => {

	const [queue, setQueue] = useState(null)

	useEffect(()=>{
		userAPI.queue().then(fetched_queue => setQueue(fetched_queue))
	},[freshness])

	
	return queue ? (
		<div className="player-queue app-tile">
			<QueueTrackList tracks={queue.queue} image  context={false}/>
		</div>
	) : null;
}

