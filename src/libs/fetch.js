export default class Fetch {
	constructor(baseUrl, opts) {
		this._baseUrl = baseUrl
		this._opts = opts
	}

	_baseUrl = ''
	_opts = {}
	
	_handleError = (error) => {
		const errorObject = {
			status: error.status,
			statusText: error.statusText,
			// data: await error.json()
		}

		if (this._opts?.errorHandler) return this._opts.errorHandler(errorObject)
		else return errorObject
	}

	/**
	 * get
	 */
	get = async (url) => {
		try {
			const res = await fetch(`${this._baseUrl}/${url.startsWith('/') ? url.replace('/', '') : url}`, {
				method: 'GET',
			})

			if (!res.ok) throw res
	
			return await res.json()
		} catch (error) {
			return Promise.reject(this._handleError(error))
		}
	}
}
