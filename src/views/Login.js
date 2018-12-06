import React, { Component } from 'react';
import FormInput from '../styled_components/FormInput'
import Logo from '../styled_components/Logo';

export default class Login extends Component {

	render() {
		const {
			username = '', 
			password = '',
			error,
		} = this.state || {};

		const {
			api,
			onLogin 
		} = this.props;

		return (
			<div className='login-view'>
				<Logo />
				<FormInput 
					label='user'
					type='text'
					value={username}
					onChange={({target: {value}}) => {
						this.setState({username: value});
					}} />
				<FormInput 
					label='password'
					type='password'
					value={password}
					onChange={({target: {value}}) => {
						this.setState({password: value});
					}} />
				<button children='next' 
					onClick={ () => {
						api.post('auth/login', this.state)
						.then(onLogin).catch((error) => {
							this.setState({error});
						});
					}} />
				{error && <span className='error'>{error}</span>}
			</div>
		);
	}
}
