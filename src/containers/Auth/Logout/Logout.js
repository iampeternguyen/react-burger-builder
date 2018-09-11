import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../../../store/actions/auth';

class Logout extends Component {
	componentWillMount() {
		this.props.logoutUser();
		this.props.history.replace('/');
	}
	render() {
		return <div />;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => dispatch(authActions.authLogout()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Logout);
