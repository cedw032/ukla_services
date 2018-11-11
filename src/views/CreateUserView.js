import React, { Component } from 'react';
import post from '../post'

export default class CreateUserView extends Component {

	render() {
		const {
			username = '', 
			password = '',
		} = this.state || {};

		return (
			<div className="create-user-view">
				<span>username</span>
				<input type='text' 
					value={username}
					onChange={({target: {value}}) => {
						this.setState({username: value});
					}} />
				<span>password</span>
				<input type='text' 
					value={password}
					onChange={({target: {value}}) => {
						this.setState({password: value});
					}} />
				<button children='Create User' 
					onClick={ () => {
						post('user', this.state).then((result) => {
							console.log('RESULT', result);
							this.setState({
								username: '',
								password: '',
							});
						})
					}} />
			</div>
		);
	}
}
