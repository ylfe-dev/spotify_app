import './Album.scss'

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faRecordVinyl, faMusic, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

import { suspensePromise } from '../../utils'

import {AlbumTrackList} from '../TrackList'
import contentAPI  from '../../API/content'

import Spinner from '../Spinner'
import SquareImage from '../SquareImage'

const Album = ({id}) =>{
	const album_promise = suspensePromise(contentAPI.album(id));
	console.log("Album rerender")
	return (
		<div className="app-album">
			<Suspense fallback={<Spinner />}>
				<AlbumHeader fetcher={album_promise}/>
				<AlbumTracks fetcher={album_promise}/>
			</Suspense>
		</div>
	)
}

export default Album;


const AlbumHeader = ({fetcher}) => {
	const album = fetcher.read();
	const navigate = useNavigate();

	function clickArtistHandler (id) {
		navigate("/artist/"+id)
	}
	return album ? (
		<header>
			{album.images[0] ? <SquareImage className="album-image" size={180} radius={10} src={album.images[0].url}/> : null}
			
			<div className="album-title">
				<h1>{album.name}</h1>
				<p className="album-artists">
					{album.artists.map(artist => <button  onClick={()=>clickArtistHandler(artist.id)}>{artist.name}</button>)}
				</p>
				{album.description ? <p className="playlist-description">{album.description}</p> : null}
			</div>
			
			<p className="album-details">
				<span><FontAwesomeIcon icon={faRecordVinyl} />{album.album_type}</span>
				<span><FontAwesomeIcon icon={faCalendar} />{album.release_date}</span>
				<span><FontAwesomeIcon icon={faMusic} />{album.tracks.total}</span>
			</p>


		</header>
	) : null;
}


const AlbumTracks = ({fetcher})=>{
	const album = fetcher.read();
	console.log(album)
	return (
		<section className="album-tracklist app-tile">
		<h3 className="tracklist-header">
			<span style={{textAlign:"center"}}>#</span>

			<span>title</span>
			<span style={{textAlign:"center"}}>duration</span>
		</h3>
			<div className="scroller">
				<AlbumTrackList tracks={album.tracks.items} context={album.uri}/>
			</div>
		<p className="album-copyrights">
			{album.copyrights.map((copyright, index) => <span key={index}> {copyright.type == "C" ? "© ": "℗ " } {copyright.text}</span>)}
		</p>
		</section>
	)
}
//