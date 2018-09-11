import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import AxiosOrders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as orderActions from '../../store/actions/order';
class Orders extends Component {
	state = {
		orders: [],
	};
	componentDidMount() {
		this.props.fetchOrdersStart(this.props.token);
	}

	render() {
		let orders = <Spinner />;

		if (this.props.loading === false) {
			orders = this.props.orders.map(data => {
				return <Order orderData={data} key={data.id} />;
			});
		}

		return <div>{orders}</div>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchOrdersStart: token => {
			dispatch(orderActions.fetchOrdersStart(token));
		},
	};
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, AxiosOrders));
