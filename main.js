const { FileOpener } = require('./Components/FileOpener')
const database = new FileOpener('./data.json')

const express = require('express')

const app = express()

const PORT = process.env.PORT || 4000


app.get('/', (request, response) => {

	console.log(request.query)

	response.send('Welcome to Home!')

})

app.get('/search', (request, response) => {

	const { query } = request.query

	;(async () => {

		const rawData = await database.read()
		const data = JSON.parse(rawData).filter(fr => fr.fruit === query.toLowerCase())

		let output = ''

		if(data.length > 0) {
			data.forEach(d => output += d.fruit + ' is ' + d.price + '\n')
		} else {
			output += 'Data not found :('
		}

		response.send(`Searched fruit: ${query} \n ${output}`)
	})()

})

app.listen(PORT, () => console.log(`Server ready at ${PORT}`))
