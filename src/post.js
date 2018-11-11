import axios from 'axios'
import config from './config'

export default function post(route, payload) {

	return new Promise((resolve, reject) => {
		const base = config().isDev ? 'http://localhost:5000/' : '';
		const url= base + route; 
		console.log('post: ', base, route, payload);
		axios.post(url, payload).then((result) => resolve(result.data)).catch((e) => {
			console.error(e);
			reject(e);
		});
	});
}