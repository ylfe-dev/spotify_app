import cloneDeep from 'lodash.clonedeep';
const apiCache = new Map();


export default async function apiFetcher(path, cache_time=false) {
	console.log("run apiFetcher("+path+")")
	if( !apiCache.has(path) || (apiCache.get(path).expires - Date.now()) <= 0 ){
		const promise = fetch(window.location.origin+"/api/"+path)
			.then(res => {
				console.log("Fetch status("+path+"): "+ res.status)
				if(res.ok) 
					return res.json()
				else 
					throw res.status; 
			})
			.catch(error=>{
				console.error("Fetch error: "+error);
				if(error==401) return null;
				return new Promise((resolve) => 
			    setTimeout(()=>{
			    	console.log("Retrying...");
			    	resolve(apiFetcher(path,cache_time))
			    }, 2000)
				);
			})

			if(!cache_time) 
				return promise;
			else
				apiCache.set(path, {request:promise, expires: Date.now()+cache_time})
		}else console.log("Fetched ("+path+") from cache.")
		const response = await apiCache.get(path).request;
		return cloneDeep(response)
}