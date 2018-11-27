import React, { Component } from 'react';

export default class CreateUser extends Component {

	render() {
		const {
			username = '', 
			password = '',
			p2 = '',
			error,
		} = this.state || {};

		const {post} = this.props.api;

		return (
			<div className="create-user">
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
				<span>confirm password</span>
				<input type='text' 
					value={p2}
					onChange={({target: {value}}) => {
						this.setState({p2: value});
					}} />
				<button children='Create User' 
					onClick={ () => {

						if (!username || !password) {
							this.setState({error: 'All fields require input'});
							return;
						}

						if (password !== p2) {
							this.setState({error: 'Passwords do not match'});
							return;
						}

						post('auth/register', this.state)
						.then((result) => {
						}).catch((error) => {
							this.setState({error});
						});
					}} />
				{error && <span className='error'>{error}</span>}
			</div>
		);
	}
}
