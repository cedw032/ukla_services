import React, { Component } from 'react';

export default class EnterMarks extends Component {

	// Should I integrate a redux store?
	// any store

	constructor(props) {
		super(props);

		this.state = {};

		props.api.get('intake')
		.then((intakes) => this.setState({intakes}))
		.catch(console.error);
	}

	selectIntake = (intake) => {
		this.props.api.get('student', {constraints: {intake}})
		.then((students) => this.setState({students}))
		.catch(console.error);
	}

	render() {
		
		const {
			props: {
				navigate,
			},
			state: {
				intakes = [],
				students
			},
			selectIntake,
		} = this;

		console.log('intakes', intakes);

		if (!students) {
			return (
				<div className="enter-marks">
					<h1>Select Intake</h1>
					{ intakes.map((intake, i) => 
						<button key={i} onClick={() => selectIntake(intake)}>{intake}</button>) }
				</div>
			);
		}
	}
}
