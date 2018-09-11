import React from 'react';
import cssClasses from './toggle.css';

const toggle = props => (
	<div onClick={props.clicked}>
		<div className={cssClasses.ToggleBar} />
		<div className={cssClasses.ToggleBar} />
		<div className={cssClasses.ToggleBar} />
	</div>
);

export default toggle;
