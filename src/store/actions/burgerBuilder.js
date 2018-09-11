import * as actionTypes from './actionsTypes';
import axiosOrders from '../../axios-orders';

export const addIngredient = ingredientType => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientType,
	};
};

export const removeIngredient = ingredientType => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientType,
	};
};

const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients,
	};
};

export const setIngredientsFailed = () => {
	return {
		type: actionTypes.SET_INGREDIENTS_FAILED,
	};
};

export const initIngredientsFromServer = () => {
	return dispatch => {
		axiosOrders
			.get('https://react-my-burger-9abe4.firebaseio.com/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(setIngredientsFailed());
			});
	};
};
