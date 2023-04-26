import https from 'https';

const request = ({options, data=false}) =>{
	return new Promise((resolve, reject) => {
		const req = https.request(options, res => {
	        let recieved_data = [];
	        res.on('data', chunk => recieved_data.push(chunk));
	      	res.on('end', () => {
		      	const response_data = Buffer.concat(recieved_data).toString();
		      	if (res.statusCode >= 200 && res.statusCode <= 299) 
		      		resolve(response_data);
		      	else {
		      		console.error(prettyError(res.statusCode, response_data, options, data));
		      		reject(res.statusCode);
		      	}
	  		}); 
		});

		req.on('error', error =>{
			console.error("HTTPS Request Error: "+error);
			reject(500);
		})

		if(data) req.write(data);
		req.end(); 
		
	});
}

export default request;



const prettyError = (res_code, res_data, req_header, req_data=false ) => `
	\n\nREQUEST
	\n----------------------------
	\n---HEADER:
	\n${JSON.stringify(req_header)}
	  ${req_data? "---BODY:\n"+req_data : ""}
	\n\nRESPONSE
	\n----------------------------
	\n---CODE: ${res_code}
	\n---DATA:
	\n${res_data}
	\n\n
`;

