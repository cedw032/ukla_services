import React, { Component } from 'react';

import CreateUser from './views/CreateUser';
import MainMenu from './views/MainMenu';
import UploadIntake from './views/UploadIntake';
import EnterMarks from './views/EnterMarks';
import PrintReports from './views/PrintReports';
import Login from './views/Login';

import provideApi from './provideApi';

import background from './background.jpg';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.getItem('token'),
			path: 'mainMenu',
		};
	}

	onLogin = (token) => {
		localStorage.setItem('token', token);
		this.setState({token});
	}

	navigate = (path) => {
		this.setState({path});
	}

	render() {

		const {
			state: {
				token,
				path,
			},
			onLogin,
			navigate,
		} = this;

		const viewProps = {
			api: provideApi(token), 
			navigate,
		}

		const currentView = token ? {
			mainMenu: <MainMenu {...viewProps} />,
			createUser: <CreateUser {...viewProps} />,
			uploadIntake: <UploadIntake {...viewProps} />,
			enterMarks: <EnterMarks {...viewProps} />,
			printReports: <PrintReports {...viewProps} />,
		}[path] : <Login onLogin={onLogin} {...viewProps} />

		return [
			<img key='background' src={background} className='background' />,
			<div key='app' className="app">
				{ currentView }
			</div>
		];
	}
}
export default App;
