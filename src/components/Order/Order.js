import React from 'react';
import cssClasses from './Order.css';
const Order = props => {
	let ingredients = [];

	for (let key in props.orderData.ingredients) {
		if (props.orderData.ingredients[key] !== 0) {
			ingredients.push(key + ' (' + props.orderData.ingredients[key] + ')');
		}
	}

	ingredients = ingredients.map((elem, index) => (
		<span className={cssClasses.Ingredient} key={index}>
			{elem}
		</span>
	));

	return (
		<div className={cssClasses.Order}>
			<p>Ingredients: {ingredients}</p>
			<p>Ingredients Order: {props.orderData.ingredientsOrder.join(', ')}</p>
			<p>
				Price <strong>${parseFloat(props.orderData.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
