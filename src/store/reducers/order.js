import * as actionTypes from '../actions/actionsTypes';

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
};

const reducer = (state = initialState, action) => {
	let nextState = getCopiedState(state);

	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			nextState.loading = false;
			nextState.purchased = true;

			return nextState;
		case actionTypes.PURCHASE_BURGER_FAIL:
			nextState.loading = false;
			return nextState;
		case actionTypes.PURCHASE_BURGER_LOADING:
			nextState.loading = true;
			return nextState;
		case actionTypes.PURCHASE_BURGER_INIT:
			nextState.purchased = false;
			return nextState;

		case actionTypes.FETCH_ORDERS_LOADING:
			nextState.loading = true;
			return nextState;
		case actionTypes.FETCH_ORDERS_SUCCESS:
			nextState.loading = false;
			nextState.orders = [...action.orderData];
			return nextState;
		case actionTypes.FETCH_ORDERS_FAIL:
			nextState.loading = false;
			return nextState;

		default:
			return nextState;
	}
};

const getCopiedState = state => {
	return {
		...state,
		orders: [...state.orders],
	};
};

export default reducer;
