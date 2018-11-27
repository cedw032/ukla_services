import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUser from './views/CreateUser';
import MainMenu from './views/MainMenu';
import UploadEnrolment from './views/UploadEnrolment';
import EnterMarks from './views/EnterMarks';
import PrintReports from './views/PrintReports';
import Login from './views/Login';
import provideApi from './provideApi';

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

		console.log('VP', viewProps);

		const currentView = token ? {
			mainMenu: <MainMenu {...viewProps} />,
			createUser: <CreateUser {...viewProps} />,
			uploadEnrolment: <UploadEnrolment {...viewProps} />,
			enterMarks: <EnterMarks {...viewProps} />,
			printReports: <PrintReports {...viewProps} />,
		}[path] : <Login onLogin={onLogin} {...viewProps} />

		return <div className="app">{ currentView }</div>;
	}
}
export default App;
