import React, {Component} from 'react';
import logo from '../content/logo.png';

export default function Cells({columns, grid}) {
	return (
		<table className='cells'>
			<thead className='cells-header'>
				<tr>
					{columns.map((column, i) => 
						<th key={i}>
							<input className='cell' value={column} readOnly />
						</th>
					)}
				</tr>
			</thead>
			<tbody className='cells-body'>
				{grid.map((row, i) => 
					<tr key={i}>
						{row.map((cell,i) => 
							<td key={i}>
								<input 
									className='cell'
									value={cell.value}
									onChange={cell.onChange}
									readOnly={!cell.onChange} />
							</td>
						)}
					</tr>
				)}
			</tbody>
		</table>
	);
}