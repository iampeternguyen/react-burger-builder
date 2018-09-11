import * as actionTypes from '../actions/actionsTypes';

const INGREDIENT_PRICES = {
	meat: 2,
	cheese: 0.6,
	salad: 0.4,
	bacon: 1,
};
const BASE_BURGER_PRICE = 4;

const initialState = {
	ingredients: null,
	ingredientList: [],
	totalPrice: BASE_BURGER_PRICE,
	error: false,
	INGREDIENT_PRICES,
	BASE_BURGER_PRICE,
};

const reducer = (state = initialState, action) => {
	let nextState = getCopiedState(state);

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			nextState = addIngredient(nextState, action);
			return nextState;
		case actionTypes.REMOVE_INGREDIENT:
			nextState = removeIngredient(nextState, action);
			return nextState;

		case actionTypes.SET_INGREDIENTS:
			nextState = setIngredients(nextState, action);
			return nextState;
		case actionTypes.SET_INGREDIENTS_FAILED:
			nextState = setIngredientsFailed(nextState, action);
			return nextState;

		default:
			return nextState;
	}
};

const getCopiedState = state => {
	return {
		...state,
		ingredients: { ...state.ingredients },
		ingredientList: [...state.ingredientList],
	};
};

const addIngredient = (nextState, action) => {
	nextState.ingredients[action.ingredientType] = nextState.ingredients[action.ingredientType] + 1;
	nextState.ingredientList.push(action.ingredientType);
	nextState = calculateBurgerPrice(nextState);

	return nextState;
};

const removeIngredient = (nextState, action) => {
	if (nextState.ingredients[action.ingredientType] !== 0) {
		nextState.ingredients[action.ingredientType] = nextState.ingredients[action.ingredientType] - 1;
		for (var i = nextState.ingredientList.length - 1; i >= 0; i--) {
			if (nextState.ingredientList[i] === action.ingredientType) {
				nextState.ingredientList.splice(i, 1);
				break;
			}
		}

		nextState = calculateBurgerPrice(nextState);

		return nextState;
	}
};

const calculateBurgerPrice = nextState => {
	let totalPrice = BASE_BURGER_PRICE;
	for (var key in INGREDIENT_PRICES) {
		totalPrice += INGREDIENT_PRICES[key] * nextState.ingredients[key];
	}
	nextState.totalPrice = totalPrice;
	return nextState;
};

const setIngredients = (nextState, action) => {
	nextState.ingredients = action.ingredients;
	nextState.ingredientList = [];
	nextState.totalPrice = BASE_BURGER_PRICE;
	nextState.error = false;
	return nextState;
};

const setIngredientsFailed = (nextState, action) => {
	nextState.error = true;
	return nextState;
};

export default reducer;
