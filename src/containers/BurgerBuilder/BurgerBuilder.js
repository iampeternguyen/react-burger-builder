import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import axiosOrders from '../../axios-orders';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		this.props.setIngredients();
	}

	orderNowHandler = () => {
		this.setState({
			purchasing: true,
		});
	};

	purchaseCancelledHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	continueToPurchasehandler = () => {
		this.props.purchaseBurgerInit();
		this.props.history.push({
			pathname: '/checkout',
			state: {
				ingredientList: [...this.props.ingredientList],
				ingredients: { ...this.props.ingredients },
				totalPrice: this.props.totalPrice,
			},
		});
	};

	render() {
		const ingredientsDisabled = {
			...this.props.ingredients,
		};

		for (let key in ingredientsDisabled) {
			ingredientsDisabled[key] = ingredientsDisabled[key] <= 0;
		}

		let orderSummary = (
			<OrderSummary
				ingredients={this.props.ingredients}
				cancelOrder={this.purchaseCancelledHandler}
				placeOrder={this.continueToPurchasehandler}
				price={this.props.totalPrice}
			/>
		);

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		let burger = this.props.error ? <p>Something went wrong!</p> : <Spinner />;
		if (Object.keys(this.props.ingredients).length !== 0) {
			burger = (
				<Aux>
					<Modal show={this.state.purchasing} closeModal={this.purchaseCancelledHandler}>
						{orderSummary}
					</Modal>
					<Burger ingredients={this.props.ingredientList} />
					<BuildControls
						addIngredient={this.props.addIngredient}
						removeIngredient={this.props.removeIngredient}
						ingredientsDisabled={ingredientsDisabled}
						price={this.props.totalPrice}
						purchaseable={this.props.totalPrice > this.props.BASE_BURGER_PRICE ? true : false}
						orderNow={this.orderNowHandler}
					/>
				</Aux>
			);
		}
		return burger;
	}
}

const mapStateToProps = state => {
	return {
		BASE_BURGER_PRICE: state.burgerBuilder.BASE_BURGER_PRICE,
		INGREDIENT_PRICES: state.burgerBuilder.INGREDIENT_PRICES,
		ingredients: state.burgerBuilder.ingredients,
		ingredientList: state.burgerBuilder.ingredientList,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ingredientType => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
		removeIngredient: ingredientType => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
		setIngredients: () => dispatch(burgerBuilderActions.initIngredientsFromServer()),
		purchaseBurgerInit: () => dispatch(orderActions.purchaseBurgerInit()),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
