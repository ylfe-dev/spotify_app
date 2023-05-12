import apiFetcher from './apiFetcher';

const contentAPI = {
  album: (id) => apiFetcher("album/"+id, 3600*1000),
  playlist: (id) => apiFetcher("playlist/"+id, 3600*1000),
  artist: (id) => apiFetcher("artist/"+id, 3600*1000),
  artistTop: (id, country) => apiFetcher("artist/"+id+"/top/"+country, 3600*1000),
  artistAlbums: (id) => apiFetcher("artist/"+id+"/albums", 3600*1000),
}

export default contentAPI;
