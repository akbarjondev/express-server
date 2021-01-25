const fs = require('fs')
const path = require('path')
const util = require('util')


class FileOpener {

	path = undefined

	constructor(path) {
		this.path = path
	}

	read() {
		const read = util.promisify(fs.readFile)
		return read(this.path, 'utf8')
	}

	write(data) {
		const write = util.promisify(fs.writeFile)
		return write(this.path, data)
	}
}

module.exports.FileOpener = FileOpener
