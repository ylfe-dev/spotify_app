import './Player.scss'

import { Suspense, useContext, useEffect, useState, useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'

import { ThemeContext } from "../ContextProvider";

import { suspensePromise } from '../utils'
import SquareImage from './SquareImage'
import userAPI  from '../API/user'



const Player = ({className}) =>{


	const player_fetch = suspensePromise(userAPI.player());
	console.log("player rerender")


	return (
		<section className={"app-player "+className}>
			<Suspense fallback={"loading..."}>
				<ComposedPlayer fetcher={player_fetch} />
			</Suspense>
		</section>
		)
}

export default Player;


export const playTrack = id =>{
	
}




const ComposedPlayer = ({fetcher}) => {
	const { setTheme } = useContext(ThemeContext)
	const player_resolved = fetcher.read();
	const [player, setPlayer] = useState(player_resolved)

	console.log("composed player rerender")

	useEffect(()=>{
			const interval = setInterval(updateHandler, 150000);
			return () => clearInterval(interval)
	},[])

	useEffect(()=>{
		console.log("-theme update")
		setTheme({ image:player.item.album.images[player.item.album.images.length-1].url})
	},[player.item])


	const updateHandler = () => {
		console.log("player update")
		userAPI.player().then(data => setPlayer(data))
	}

	const tranck_info = useMemo(
		() => <PlayerTrackInfo 
			name={player.item.name}
			image={player.item.album.images[0].url}
			artists={player.item.artists} />,
		[player.item.id])


	return (
		<>
			{tranck_info}
			<PlayerControls playing={player.is_playing} update={updateHandler}/>
		</>
	)
}

 

const PlayerControls = ({playing, update}) => {
	const handleSkipPrev = ev => userAPI.playerPrev().then(update);
	const handleSkipNext = ev => userAPI.playerNext().then(update);
	const handleStartPause = ev => playing ? 
	userAPI.playerPouse().then(update) : userAPI.playerStart().then(update);

	return (
		<div className="player-controls">
			<button onClick={handleSkipPrev} ><FontAwesomeIcon icon={faBackwardStep} /></button>
			<button onClick={handleStartPause} ><FontAwesomeIcon icon={playing ? faPause : faPlay} /></button>
			<button onClick={handleSkipNext} ><FontAwesomeIcon icon={faForwardStep} /></button>
		</div>
	)
}


const PlayerTrackInfo = ({name, artists, image}) => {
	return (
		<>
			<SquareImage className="player-image" radius={10} src={image} />
			<div className="player-title">
				<h4>{name}</h4>
				<h5>{artists.map(artist=><span>{artist.name}</span>)}</h5>
			</div>
		</>
	)
}