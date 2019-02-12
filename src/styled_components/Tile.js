import React from 'react';

const Tile = ({heading, detail, onClick}) => 
	<div className='tile' onClick={onClick}>
		<h1>{heading}</h1>
		<p>{detail}</p>
	</div>;

export default Tile;