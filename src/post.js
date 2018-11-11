import axios from 'axios'
import config from './config'

export default function post(route, payload) {

	return new Promise((resolve, reject) => {
		const base = config().isDev ? 'http://localhost:5000/' : 'https://still-hollows-65231.herokuapp.com/';
		const url= base + route; 
		console.log('post: ', base, route, payload);
		axios.post(url, payload).then((result) => resolve(result.data)).catch((e) => {
			console.error(e);
			reject(e);
		});
	});
}