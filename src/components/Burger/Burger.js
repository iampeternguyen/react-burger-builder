import React from 'react';
import cssClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = props => {
	var ingredientsAsJSXArray = [];
	ingredientsAsJSXArray = props.ingredients.map((type, index) => {
		return <BurgerIngredient type={type} key={type + index} />;
	});

	if (ingredientsAsJSXArray.length === 0) {
		ingredientsAsJSXArray = <p>Please start adding ingredients</p>;
	} else {
		ingredientsAsJSXArray.reverse();
	}
	return (
		<div className={cssClasses.Burger}>
			<BurgerIngredient type="bread-top" />
			{ingredientsAsJSXArray}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
