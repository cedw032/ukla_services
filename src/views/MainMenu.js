import React, { Component } from 'react';
import Tile from '../styled_components/Tile';

export default class MainMenu extends Component {

	render() {
		const {navigate} = this.props;

		return (
			<div className="main-menu">
				<Tile 
					heading='Upload Intake'
					detail={`This should be your first step when using this application.  
						From here you can upload an excel workbook and select a sheet containing all of the students 
						you would like to provide marks for in this intake of classes.  You will be asked to
						enter a name for this intake before it is stored. This is not where you enter the marks
						That happens in the next section`}
					onClick={() => navigate('uploadIntake')} />
				
				<Tile
					heading='Enter Marks'
					detail={`Here is where you enter marks for your students.  From here you can select an intake
							of students to provides marks for.  After selecting an intake you will be taken to a table of marks which
							are grouped by teacher and grade.  Marks are stored and updated almost immediately once entered`} 
					onClick={() => navigate('enterMarks')} />

				<Tile
					heading='Print Reports'
					detail={`From this area you can select an intake of students and print report cards for that period.  This section
						is not currently usable`}
					onClick={() => navigate('printReports')} />

				<Tile
					heading='Create User'
					detail={`From here you can create new users so that other people can sign in to the application. The login system
						is currently under construction, so this section doesn't really do much`} 
					onClick={() => navigate('createUser')} />
			</div>
		);
	}
}
