import React, { Component } from 'react';
import Dropzone from '../styled_components/Dropzone'; 
import XLSX from '../../node_modules/xlsx/xlsx.js';

export default class UploadIntake extends Component {

	constructor(props) {
		super(props); 
		this.state = {mode: 'selectFile'};
	}

	processFile = (data) => {
		const workbook = XLSX.read(data, {type: 'binary'});

		const sheetNames = workbook.SheetNames;

		const grids = sheetNames.reduce((grids, sheetName) => {
			grids[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			return grids;
		}, {});

		const currentSheetName = sheetNames[0];

		this.setState({
			mode: 'selectSheet',
			sheetNames,
			currentSheetName,
			grids,
		});
	}

	onSheetSelect = ({target: {value}}) => {
		this.setState({currentSheetName: value});
	}

	onSheetConfirm = () => {
		this.setState({mode: 'nameIntake'});
	}

	onIntakeNameChange = ({target: {value}}) => {
		this.setState({intakeName: value});
	}

	onIntakeNameConfirm = () => {
		this.setState({mode: 'upload'});

		const {
			state: {
				intakeName,
				currentSheetName,
				grids,
			},
			props: {
				api
			}
		} = this;

		api.post('intake', {
			intakeName,
			students: grids[currentSheetName]
		}).then(() => {
			this.setState({mode: 'uploadComplete'});
		})
	}

	render() {
		const {
			props: {
				navigate,
			},
			state: {
				mode,
				currentSheetName,
				sheetNames,
				grids,
				intakeName = '',
			},
			processFile,
			onSheetSelect,
			onSheetConfirm,
			onIntakeNameChange,
			onIntakeNameConfirm,
		} = this;

		return (
			<div className="upload-intake">
				<h1>Upload Intake</h1>
				{{
					selectFile: <Dropzone onFileLoad={processFile} />,
					selectSheet: <SelectSheet 
						sheetNames={sheetNames} 
						grids={grids} 
						currentSheetName={currentSheetName}
						onSelect={onSheetSelect} 
						onConfirm={onSheetConfirm} />,
					nameIntake: [
						<input key='input' value={intakeName} onChange={onIntakeNameChange} />,
						<button key='button' onClick={onIntakeNameConfirm}>Next</button>
					],
					upload: <span>Saving...</span>,
					uploadComplete: [
						<span key='span'>Upload Complete</span>,
						<button key='button' onClick={() => navigate('mainMenu')}>Home</button>
					],
				}[mode]}
			</div>
		);
	}
}

function SelectSheet({sheetNames, grids, currentSheetName, onSelect, onConfirm}) {

	const grid = grids[currentSheetName] || [];
	const columns = Object.keys(grid[0] || {});

	return [
		<select key='select' value={currentSheetName} onChange={onSelect}>
			{sheetNames.map((name, i) => <option key={i} value={name}>{name}</option>)}
		</select>,
		<table key='table'>
			<thead className='upload-sheet-header'>
				<tr>
					{columns.map((column, i) => 
						<th key={i}>
							<input value={column} readOnly />
						</th>
					)}
				</tr>
			</thead>
			<tbody className='upload-sheet-body'>
				{grid.map((row, i) => 
					<tr key={i}>
						{columns.map((column,i) => 
							<td key={i}>
								<input value={row[column]} readOnly/>
							</td>
						)}
					</tr>
				)}
			</tbody>
		</table>,
		<button key='button' onClick={onConfirm}>Next</button>
	];
}

