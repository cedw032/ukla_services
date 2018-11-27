import axios from 'axios'
import config from './config'

export default function provideApi(token) {

	const getUrl = (route) => {
		const base = config().isDev ? 'http://localhost:5000/' : 'https://still-hollows-65231.herokuapp.com/';
		const url = base + route; 
		return url;
	}

	return {
		post: (route, payload) => {
			return new Promise((resolve, reject) => {
				axios.post(getUrl(route), payload)
				.then((result) => {
					if (result.data.status === 'success') {
						resolve(result.data.data);
						return;
					}

					console.error(result.data.message);
					reject(result.data.message);
				})
				.catch((e) => {
					console.error(e.message);
					reject(e.message);
				});
			});
		},

		get: (route, payload) => {

		},
	};

}