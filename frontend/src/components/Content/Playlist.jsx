import './Playlist.scss'
import { PlaylistList } from '../PlaylistList'
import { Suspense, useContext } from 'react'
import { suspensePromise } from '../../utils'

import TrackList from '../TrackList'
import contentAPI  from '../../API/content'


const Playlist = ({id}) =>{

	const playlists_promise = suspensePromise(contentAPI.playlist(id));

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<TrackList collection={playlists_promise} />
		</Suspense>
	)
}

export default Playlist;