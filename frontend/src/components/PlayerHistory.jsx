const PlayerHistory = () => {

	const recently_promise = suspensePromise(userAPI.queue());
	
	return (
		<div className="player-queue app-tile">
			<QueueTrackList tracks={queue.queue} image  context={false}/>
		</div>
	)
}

export default PlayerHistory;