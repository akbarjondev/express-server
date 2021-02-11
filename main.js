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

	if(query !== undefined) {
		;(async () => {

			const rawData = await database.read()
			const data = JSON.parse(rawData).filter(fr => fr.fruit === query.toLowerCase())
			// const data = JSON.parse(rawData).map(fr => {return fr.fruit.match(new RegExp(query, 'gi')) })

			response.send(data)
		})()
	} else {
		response.send([{response: 'query is undefined'}])
	}
})

app.listen(PORT, () => console.log(`Server ready at ${PORT}`))
