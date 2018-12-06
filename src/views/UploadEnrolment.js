import React, { Component } from 'react';
import Dropzone from '../styled_components/Dropzone'; 
import XLSX from 'XLXS';

export default class UploadEnrolment extends Component {

	constructor(props) {
		super(props);

		this.state = {mode: 'upload'};
	}

	processFile = (data) => {
		const workbook = XLSX.read(data, {type: 'binary'});
		console.log('workbook', workbook);
	}

	render() {
		const {
			props: {
				navigate,
			},
			state: {
				mode,
			},
			processFile
		} = this;

		return (
			<div className="upload-enrolment">
				<h1>Upload Enrolment</h1>
				{{
					upload: <Dropzone onFileLoad={processFile} />
				}[mode]}
			</div>
		);
	}
}
