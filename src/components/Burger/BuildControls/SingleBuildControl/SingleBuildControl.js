import React from 'react';
import cssClasses from './SingleBuildControl.css';

const singleBuildControl = props => (
	<div className={cssClasses.SingleBuildControl}>
		<div className={cssClasses.Label}>{props.label}</div>
		<button className={cssClasses.Less} onClick={props.removeIngredient} disabled={props.disabledLess}>
			Less
		</button>
		<button className={cssClasses.More} onClick={props.addIngredient}>
			More
		</button>
	</div>
);

export default singleBuildControl;
