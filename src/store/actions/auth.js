import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const authStart = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authLoading());
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		const url = isSignUp
			? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqcCniq1qJCVNDfIjQNb34wC6OsPzYFdI'
			: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqcCniq1qJCVNDfIjQNb34wC6OsPzYFdI';

		axios
			.post(url, authData)
			.then(response => {
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);

				localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error.message));
			});
	};
};

const authSuccess = (token, id) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token,
		id,
	};
};

const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING,
	};
};

const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
};

export const authLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = timeout => {
	return dispatch => {
		setTimeout(() => {
			dispatch(authLogout());
		}, timeout);
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token) {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			const userId = localStorage.getItem('userId');
			if (expirationDate > new Date()) {
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
			} else {
				dispatch(authLogout());
			}
		} else {
			dispatch(authLogout());
		}
	};
};
