import React from 'react';
import cssClasses from './BuildControls.css';
import SingleBuildControl from './SingleBuildControl/SingleBuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
];

const buildControls = props => (
	<div className={cssClasses.BuildControls}>
		<p>
			Current Price: <strong>${props.price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => (
			<SingleBuildControl
				key={ctrl.label}
				label={ctrl.label}
				addIngredient={() => props.addIngredient(ctrl.type)}
				removeIngredient={() => props.removeIngredient(ctrl.type)}
				disabledLess={props.ingredientsDisabled[ctrl.type]}
			/>
		))}
		<button className={cssClasses.OrderButton} disabled={!props.purchaseable} onClick={props.orderNow}>
			ORDER NOW!
		</button>
	</div>
);

export default buildControls;
