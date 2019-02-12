import React, { Component } from 'react';
import Cells from '../styled_components/Cells';
import Select from '../styled_components/Select';


export default class EnterMarks extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		props.api.get('intake')
		.then((intakes) => this.setState({intakes}))
		.catch(console.error);
	}

	selectIntake = (intake) => {

		const {
			props: { 
				api
			},
			setState,
			getTeachers,
			getGrades,
			selectTeacher,
			selectGrade,
		} = this;

		api.get('student', {intake: [intake]})
		.then((students) => {
			selectTeacher(getTeachers({students})[0]);
			selectGrade(getGrades({students})[0]);
			this.setState({students});
			return api.get('mark', {
				student: students.map((student) => student.id)
			});
		})
		.then(marks => this.setState({marks}))
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

	buildGrid = ({students, marks, filters}) => {

		if (!students || !marks) return [];

		students = filters.reduce((filtered, filter) => filter(filtered), students);

		const onlyMarksForStudents = studentMarks => 
			students.reduce((isPresent, student) => 
				student.id === studentMarks.student || isPresent, false
			);
		
		marks = marks
		.filter(onlyMarksForStudents)
		.reduce((marks, mark) => {
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

	getTeachers = ({students = []}) => {

		const qTeachers = students.reduce((teachers, student) => {
			teachers[student.quranTeacher] = true;
			return teachers;
		}, {});

		const iTeachers = students.reduce((teachers, student) => {
			teachers[student.islamiayatTeacher] = true;
			return teachers;
		}, {});

		const teachers = Object.keys({
			...qTeachers,
			...iTeachers,
		});

		return teachers;
	}

	getGrades = ({students = []}) => {
		const grades = Object.keys(
			students.reduce((grades, student) => {
				grades[student.grade] = true;
				return grades;
			}, {})
		);
		return grades;
	}

	selectTeacher = (teacher) => 
	{
		const filterTeacher = students => students.filter(student => 
			student.quranTeacher === teacher 
			|| student.islamiayatTeacher === teacher
		);
		this.setState({filterTeacher})
	}

	selectGrade = (grade) => {
		const {getSubjects} = this;
		const filterGrade = students => students.filter(student => student.grade === grade);
		this.setState({
			filterGrade,
			subjects: getSubjects(grade),
		})	
	}

	getSubjects = (grade) => (
		isNaN(+grade) ? [
			'Fiqh',
			'Seerah',
			'History',
			'Aqaaid',
			'',
			'Duaa',
			'Hadith',
			'Surah',
			'',
		] : [
			'Fiqh',
			'Seerah',
			'History',
			'Aqaaid',
			'Tajweed',
			'Duaa',
			'Hadith',
			'Surah',
			'100 Sunnats',
		]
	);

	render() {

		const {
			props: {
				navigate,
			},
			state: {
				intakes = [],
				students,
				subjects,
				marks,
				filterTeacher,
				filterGrade,
			},
			selectIntake,
			buildGrid,
			getTeachers,
			getGrades,
			selectTeacher,
			selectGrade,
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

				<div className='row'>
					<Select 
						options={getTeachers({students})} 
						onChange={({target: {value}}) => selectTeacher(value)} />
					<Select 
						options={getGrades({students})} 
						onChange={({target: {value}}) => selectGrade(value)} />
				</div>

				<Cells 
					columns={[
						'SID',
						'name',
						...subjects,	
					]} 
					grid={buildGrid({
						students, 
						marks,
						filters: [
							filterTeacher,
							filterGrade,
						],
					})} />
			</div>
		);
	}
}


