import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUserView from './views/CreateUserView';

class App extends Component {
	render() {
		return (
			<div className="app">
				<CreateUserView />
			</div>
		);
	}
}
export default App;
