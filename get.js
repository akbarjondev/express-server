const https = require('https')

const options = {
	hostname: 'www.google.com',
	port: 443,
	pathname: 'search',
	method: 'GET'
}

const request = https.request(options, (response) => {
	console.log(response.statusCode)

	response.on('data', (body) => {
		process.stdout.write(body)
	})
	
})

request.end()