import React, { Component } from 'react';

export default class MainMenu extends Component {

	render() {
		const {navigate} = this.props;

		return (
			<div className="main-menu">
				<button onClick={() => navigate('uploadEnrolment')}>Upload Enrolment</button>
				<button onClick={() => navigate('enterMarks')}>Enter Marks</button>
				<button onClick={() => navigate('printReports')}>Print Reports</button>
				<button onClick={() => navigate('createUser')}>Create User</button>
			</div>
		);
	}
}
