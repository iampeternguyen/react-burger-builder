import React from 'react';
import cssClasses from './Input.css';

const Input = props => {
	let inputElement = null;
	const inputClasses = [cssClasses.InputElement];

	if (!props.valid && props.shouldValidate && props.triedToSubmit) {
		inputClasses.push(cssClasses.Invalid);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textArea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option value={option.value} key={option.value}>
							{option.display}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={cssClasses.Input}>
			<label className={cssClasses.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default Input;