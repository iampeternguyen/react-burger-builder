import * as actionTypes from '../actions/actionsTypes';

const initialState = {
	token: null,
	userID: null,
	error: null,
	loading: false,
};

const reducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_FAIL:
			return updateState(state, { error: action.error, loading: false });
		case actionTypes.AUTH_SUCCESS:
			return updateState(state, { token: action.token, userID: action.id, error: null, loading: false });
		case actionTypes.AUTH_LOADING:
			return updateState(state, { loading: true });
		case actionTypes.AUTH_LOGOUT:
			return updateState(state, { token: null, userID: null });
		default:
			return state;
	}
};

const updateState = (state, updatedProps) => {
	return {
		...state,
		...updatedProps,
	};
};

export default reducers;
