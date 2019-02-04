import config from './config'

export default function provideApi(token) {

	const toUrl = (route, method) => {
		const base = config().isDev ? 'http://localhost:5000/' : 'https://still-hollows-65231.herokuapp.com/';
		route = method ? `${method}/${route}` : route;
		const url = base + route; 
		return url;
	}

	const send = (route, body, method) => {
		return new Promise((resolve, reject) => {
			fetch(toUrl(route, method), {
				method: 'post',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body),
			})
			.then((response) => response.json())
			.then((result) => {

				if (result.status === 'success') {
					resolve(result.data);
					return;
				}

				console.error(result.message);
				reject(result.message);
			})
			.catch((e) => {
				console.error(e.message);
				reject(e.message);
			});
		});
	}

	return {
		post: (route, body) => send(route, body),
		get: (route, body) => send(route, body, 'query'),
	};

}