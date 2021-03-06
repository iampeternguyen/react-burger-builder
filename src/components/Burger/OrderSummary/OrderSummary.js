import React from 'react';
import Aux from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
		return (
			<li key={ingKey}>
				<span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				Total Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>

			<Button clicked={props.cancelOrder} btnType="Danger">
				Cancel
			</Button>
			<Button clicked={props.placeOrder} btnType="Success">
				Place Order
			</Button>
		</Aux>
	);
};

export default orderSummary;
