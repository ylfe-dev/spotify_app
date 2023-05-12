import './Artist.scss'

import { Suspense, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEye, faLockOpen, faMusic } from '@fortawesome/free-solid-svg-icons'
import { suspensePromise } from '../../utils'

import {TracksList} from '../TrackList'
import contentAPI  from '../../API/content'

import Spinner from '../Spinner'
import SquareImage from '../SquareImage'
import { AuthContext } from "../../ContextProvider";

const Artist = ({id}) =>{
	const { user } = useContext(AuthContext);
	const artist_promise = suspensePromise(contentAPI.artist(id));
	const artistTop_promise = suspensePromise(contentAPI.artistTop(id, user.country));
	const artistAlbums_promise = suspensePromise(contentAPI.artistAlbums(id));

	console.log("Playlist rerender")
	return (
		<div className="app-artist">
			<Suspense fallback={<Spinner />}>
				<div className="artist-overview app-tile">
					<ArtistHeader fetcher={artist_promise}/>
					<ArtistTracks fetcher={artistTop_promise} id={id}/> 
				</div>
				<ArtistAlbums fetcher={artistAlbums_promise}/> 
			</Suspense>
		</div>
	)
}

export default Artist;


const ArtistHeader = ({fetcher, className}) => {
	const artist = fetcher.read();

	return artist ? (
		<header className={className}>
			{artist.images[0] ? <SquareImage className="artist-image" size={120} radius={100} src={artist.images[0].url}/> : null}
			<div className="artist-title">
				<h1>{artist.name}</h1>
			</div>
			
			<p className="artist-details">
				<span><FontAwesomeIcon icon={faEye} />{artist.followers.total}</span>
				<span><FontAwesomeIcon icon={faMusic} />{artist.popularity}</span>
			</p>


		</header>
	) : null;
}


const ArtistTracks = ({fetcher, id})=>{
	const tracks = fetcher.read();
  	
	return (
		<section className="artist-tracklist">
		<h3 className="tracklist-header">
			<span style={{textAlign:"center"}}>#</span>
			<span></span>
			<span>title</span>
			<span>album</span>
			<span style={{textAlign:"center"}}>duration</span>
		</h3>
			<div className="scroller">
				<TracksList tracks={tracks.tracks}/>
			</div>
		</section>
	)
}

const ArtistAlbums = ({fetcher})=>{
	const albums = fetcher.read();
	let years = [];

	albums.items.forEach(album => {
		const album_year = new Date(album.release_date).getFullYear();
		const found_year = years.findIndex(year => year.full == album_year)
		if(found_year>=0)
			years[found_year].albums.push(album)
		else 
			years.push({full:album_year, albums: [album]})
	})
	years.sort((a,b) => b.full - a.full)


	
	console.log(years)
	return (
		<section className="artist-albums app-tile scroller ">
			{years.map(year => {
				return (
					<>
						<h3>{year.full}</h3>
						{year.albums.map(album => <p>{album.name}</p>)}
					</>
				)
			})}
		</section>
	)
}