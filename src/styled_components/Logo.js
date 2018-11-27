import React, {Component} from 'react';
import logo from '../content/logo.png';

export default class Logo extends Component {
	render () {
		return <img src={logo} style={{width: 100}} />;
	}
}