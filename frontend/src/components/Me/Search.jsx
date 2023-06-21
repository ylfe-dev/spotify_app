import "./Search.scss"
import { Suspense, useState, useDeferredValue, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import { suspensePromise } from "../../utils";
import contentAPI from "../../API/content";
import SquareImage from "../SquareImage";
import Spinner from "../Spinner";
import { PlayerContext } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";


const Search = ({className}) => {
	const [query, setQuery] = useState("")
	const [active, setActive] = useState(false)
  const [results, setResult] = useState(null);
  const deferredResults = useDeferredValue(results);
	const write_timeout = useRef(null)


  function queryHandler(ev){
  	ev.preventDefault();
  	ev.stopPropagation();
  
  	setQuery(ev.target.value);

  	if(ev.target.value===""){
  		setResult(null)
  		clearTimeout(write_timeout.current);
  	}
  	else setResult(suspensePromise(new Promise((res,rej)=>{
  		clearTimeout(write_timeout.current);
  		write_timeout.current = setTimeout( () => {
	  		contentAPI.search(ev.target.value).then(result => res(result))
	  	}, 300);
  	})))

	}
  
  function activateSearch() {
  	setActive(true)
  }

  function quitSearch() {
  	setQuery("")
  	setResult(null)
  	setActive(false)
  }

  const opts = {}
  if(active) opts["autofocus"] = "autofocus";

  return (
  	<>
	    <div className={"app-search app-tile " + (active? "active" : "")}>
	      <input 
	      {...opts}
	      id="search_input" 
	      type="search" 
	      value={query}
	      placeholder="Search..."
	      onChange={queryHandler}/>
	      <label htmlFor="search_input" onClick={(query !== "" || active) ?  quitSearch : activateSearch}>
	      	<FontAwesomeIcon icon={(query !== "" || active) ? faXmark : faMagnifyingGlass }/>
	      </label>
	    </div>
	    { deferredResults && query  ? 
	      <Suspense fallback={
	      	<section className="search-results fallback">
	      		<Spinner/>
	      	</section>
	      }>
	        <SearchResults results={deferredResults} loading={results !== deferredResults} quit={quitSearch}/>
	      </Suspense>
	      : null 
	    }
	  </>
  );
};

export default Search;



const SearchResults = ({results, loading, quit}) => {
	
		//return <section className="search-results"><Spinner /></section>
	
	const search_results = results.read();
	console.log(search_results)
	return(
		<section className={"search-results " + ( loading? "loading" : "")}>
			<div className="scroller">
				<ul onClick={quit}>
					{search_results.tracks.items.map(track => <TrackResult track={track}/>)}
					{search_results.artists.items.map(artist => <ArtistResult artist={artist}/>)}
					{search_results.playlists.items.map(playlist => <PlaylistResult playlist={playlist}/>)}
				</ul>
			</div>
		</section>
	)
	
}

const TrackResult = ({track}) => {
	const { playerActions } = useContext(PlayerContext);

	function clickHandler () {
		playerActions.play(track.id);
	}

	return (
		<li>
			<button onClick={clickHandler}>
			<div className="action-icon">
				<FontAwesomeIcon icon={true ? faPlay : faEye}/>
			</div>
			<SquareImage className="image track-image" radius="10px" src={track.album.images[0] ? track.album.images[0].url : null}/>
			<div className="title">
				<h5>{track.name}</h5>
				<p>track</p>
			</div>
			</button>
		</li>
	)
}

const ArtistResult = ({artist}) => {
	const navigate = useNavigate()

	function clickHandler () {
		navigate("/artist/"+artist.id)
	}

	return (
		<li>
			<button onClick={clickHandler}>
			<div className="action-icon">
				<FontAwesomeIcon icon={faEye}/>
			</div>
			<SquareImage className="image artist-image" radius="100px" src={artist.images[0] ? artist.images[0].url : null}/>
			<div className="title">
				<h5>{artist.name}</h5>
				<p>artist</p>
			</div>
			</button>
		</li>
	)
}


const  PlaylistResult = ({playlist}) => {
	const navigate = useNavigate()

	function clickHandler () {
		navigate("/playlist/"+playlist.id)
	}

	return (
		<li>
			<button onClick={clickHandler}>
			<div className="action-icon">
				<FontAwesomeIcon icon={faEye}/>
			</div>
			{playlist.images[0] ? <SquareImage className="image artist-image" radius="10px" src={playlist.images[0] ? playlist.images[0].url : false}/> : null }
			<div className="title">
				<h5>{playlist.name}</h5>
				<p>playlist</p>
			</div>
			</button>
		</li>
	)
}