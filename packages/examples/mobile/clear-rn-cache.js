const path = require('path')
const os = require('os')
const rimraf = require('rimraf')

function clear(pattern) {
	return new Promise((resolve, reject) => {
		const target = path.join(os.tmpdir(), pattern)
		rimraf(target, (err, done) => {
			console.log(`Cleared Cache at ${target}`)
			err ? reject(err) : resolve
		})
	})
}

const patternsToClear = ['react-*', 'haste-map-react-native-packager-*']
patternsToClear.forEach(p => clear(p))
