import React, { Component } from 'react';
import Cells from '../styled_components/Cells';

export default class EnterMarks extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		props.api.get('intake')
		.then((intakes) => this.setState({intakes}))
		.catch(console.error);
	}

	selectIntake = (intake) => {

		const {api} = this.props;

		api.get('student', {intake: [intake]})
		.then((students) => {
			this.setState({students});
			return api.get('mark', {
				student: students.map((student) => student.id)
			});
		})
		.then((marks) => this.setState({marks}))
		.catch(console.error);
	}

	enqueueUpdate = (mark) => {
		
		this.batch = this.batch || {};
		this.batch[mark.id] = {score: mark.score || 0};

		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.props.api.post('mark', this.batch);
			this.batch = this.timeout = undefined;
		}, 3000);
	}

	buildGrid = (students, marks) => {

		if (!students || !marks) return [];

		marks = marks.reduce((marks, mark) => {
			const studentMarks = marks[mark.student] || [];

			studentMarks[mark.class] = {
				value: mark.score || '',
				onChange: ({target: {value}}) => {
					const restrict = (value) => {
						value.replace(/\D/g, '')
						value = +value <= 10 ? +value : value.substring(1, 2);
						return value;
					};
					mark.score = restrict(value);
					this.enqueueUpdate(mark);
					this.setState({});
				},
			};

			marks[mark.student] = studentMarks;

			return marks;
		}, {});

		return students.map((student) => 
			[
				{value: student.sid},
				{value: student.name},
				...(marks[student.id]),
			]
		);

	}

	render() {

		const {
			props: {
				navigate,
			},
			state: {
				intakes = [],
				students,
				marks,
			},
			selectIntake,
			buildGrid,
		} = this;

		if (!students) {
			return (
				<div className='enter-marks'>
					<h1>Select Intake</h1>
					{ intakes.map((intake, i) => 
						<button key={i} onClick={() => selectIntake(intake)}>{intake}</button>) }
				</div>
			);
		}

		return (
			<div className='enter-marks'>
				<Cells 
					columns={[
						'SID',
						'Student', 
						'Fiqh',
						'Seerah',
						'History',
						'Aqaaid',
						'Tajweed',
						'Duaa',
						'Hadith',
						'Surah',
						'100 Sunnats',
					]} 
					grid={buildGrid(students, marks)} />
			</div>
		);
	}
}
