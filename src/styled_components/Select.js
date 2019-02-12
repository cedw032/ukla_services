import React from 'react';

const Select = ({options, onChange}) => (
	<select {...{onChange}}>
		{options.map((option, i) => <option key={i} value={option}>{option}</option>)}
	</select>
);

export default Select;