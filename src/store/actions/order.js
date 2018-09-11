import * as actionTypes from './actionsTypes';
import AxiosOrders from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		id,
		orderData,
	};
};

const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error,
	};
};

const purchaseBurgerLoading = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_LOADING,
	};
};

export const purchaseBurgerStart = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerLoading());
		AxiosOrders.post('/order.json', orderData)
			.then(response => dispatch(purchaseBurgerSuccess()))
			.catch(error => dispatch(purchaseBurgerFail(error)));
	};
};

export const purchaseBurgerInit = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_INIT,
	};
};

const fetchOrdersSuccess = orderData => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orderData,
	};
};

const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	};
};

const fetchOrdersLoading = () => {
	return {
		type: actionTypes.FETCH_ORDERS_LOADING,
	};
};

export const fetchOrdersStart = token => {
	return dispatch => {
		dispatch(fetchOrdersLoading());
		AxiosOrders.get('/order.json?auth=' + token)
			.then(response => {
				const fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key,
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(error => dispatch(fetchOrdersFail(error)));
	};
};
