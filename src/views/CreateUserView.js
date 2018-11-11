import React, { Component } from 'react';
import post from '../post'

export default class CreateUserView extends Component {

	render() {
		return (
			<div className="create-user-view">
				<span>username</span>
				<input type='text'
					onChange={({target: {value}}) => {
						this.setState({username: value});
					}} />
				<span>password</span>
				<input type='text'
					onChange={({target: {value}}) => {
						this.setState({password: value});
					}} />
				<button children='Create User' 
					onClick={ () => {
						post('user', this.state).then((result) => {
							console.log('RESULT', result);
							this.setState({
								name: '',
								password: '',
							});
						})
					}} />
			</div>
		);
	}
}
