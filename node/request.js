import https from 'https';

const request = ({options, data=false}) =>{
	return new Promise((resolve, reject) => {
		
			const req = https.request(options, res => {
		    
		      let recieved_data = [];
		      res.on('data', chunk => {
		        recieved_data.push(chunk);
		      });
		      res.on('end', () => {
		      	const response_data = Buffer.concat(recieved_data).toString();
		      	if (res.statusCode >= 200 && res.statusCode <= 299) {
		      		resolve(response_data);
		      	} else {
		      		console.error(
		      			"Request HTTP code: " + res.statusCode
		      			+"\nMessage: "+response_data
		      			+"\n------------HEADER------------\n" + JSON.stringify(options)
		      			+"\n-------------BODY-------------\n" + data);
		      		reject(res.statusCode);
		      	}
		  		}); 
		    
			});

			req.on('error', error =>{
				console.error("HTTPS Request Error: "+error);
				reject(500);
			})

			if(data){
				req.write(data);
			}
			req.end(); 
		
	});
}

export default request;