

export default function apiFetcher(path) {
	return fetch("api/"+path)
	.then(res => {
		console.log("Fetch status("+path+"): "+ res.status)

		if(res.ok) 
			return res.json()
		else if(res.status==401) 
			throw "denied"; //redirect
		else 
			throw "error"; //retry

	}).then(json => ({status:"success", data: json}))
	.catch(error=>{
		console.log("Fetch error: "+error);
		return {status:error}
	})
}