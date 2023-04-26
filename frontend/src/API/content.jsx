import apiFetcher from './apiFetcher';

const contentAPI = {
  album: (id) => apiFetcher("album/"+id),
  playlist: (id) => apiFetcher("playlist/"+id),
  artist: (id) => apiFetcher("artist/"+id),
  artistTop: (id) => apiFetcher("artist/"+id+"/top"),
  artistAlbums: (id) => apiFetcher("artist/"+id+"/albums"),
}

export default contentAPI;
