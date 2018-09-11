import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import AxiosOrders from '../../axios-orders';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/ContactData');
	};

	render() {
		let orderSummary = <Redirect to="/" />;

		if (this.props.ingredientList.length > 0) {
			let orderPlaced = this.props.purchased ? <Redirect to="/" /> : null;
			orderSummary = (
				<div>
					{orderPlaced}
					<CheckoutSummary
						ingredients={this.props.ingredientList}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route path={this.props.match.path + '/ContactData'} render={props => <ContactData />} />
				</div>
			);
		}
		return orderSummary;
	}
}

const mapStateToProps = state => {
	return {
		ingredientList: state.burgerBuilder.ingredientList,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(withErrorHandler(Checkout, AxiosOrders));
