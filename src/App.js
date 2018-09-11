import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';

class App extends Component {
	componentWillMount() {
		this.props.checkSignedIn();
	}

	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						{this.props.isAuth ? <Route path="/orders" component={Orders} /> : null}
						<Route path="/auth" component={Auth} />
						<Route path="/logout" component={Logout} />
						<Route path="/" exact component={BurgerBuilder} />
						<Redirect to="/" />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token != null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkSignedIn: () => dispatch(authActions.authCheckState()),
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
