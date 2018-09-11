import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions/order';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			number: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'House Number',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zipcode',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{ value: 'fastest', display: 'Fastest' }, { value: 'cheapest', display: 'Cheapest' }],
				},
				value: 'fastest',
				validation: {},
				valid: true,
			},
		},
		triedToSubmit: false,
	};

	placedOrderHandler = event => {
		event.preventDefault();
		this.setState({
			triedToSubmit: true,
		});

		let formIsValid = true;

		for (let key in this.state.orderForm) {
			formIsValid = this.state.orderForm[key].valid && formIsValid;
		}

		if (formIsValid) {
			const userData = {};

			for (let key in this.state.orderForm) {
				userData[key] = this.state.orderForm[key].value;
			}

			const orderData = {
				ingredients: this.props.ingredients,
				ingredientsOrder: this.props.ingredientList,
				price: this.props.totalPrice,
				customer: userData,
			};

			console.log(this.props);
			this.props.purchaseBurgerStart(orderData);
		}
	};

	inputChangedHandler = (event, key) => {
		const updatedOrderForm = { ...this.state.orderForm };
		// this allows to safely update copies and then setting state rather than references
		const updatedElement = updatedOrderForm[key];
		updatedElement.value = event.target.value;
		updatedOrderForm[key] = updatedElement;
		updatedOrderForm[key].valid = this.checkValidity(updatedOrderForm[key].value, updatedOrderForm[key].validation);
		this.setState({
			orderForm: updatedOrderForm,
		});
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	render() {
		let formArray = [];
		for (let key in this.state.orderForm) {
			formArray.push({
				id: key,
				inputProps: this.state.orderForm[key],
			});
		}

		let form = (
			<form className={cssClasses.ContactData} onSubmit={this.placedOrderHandler}>
				<h1>Enter your contact info</h1>
				{formArray.map(input => (
					<Input
						elementType={input.inputProps.elementType}
						elementConfig={input.inputProps.elementConfig}
						value={input.inputProps.value}
						key={input.id}
						changed={event => this.inputChangedHandler(event, input.id)}
						shouldValidate={input.inputProps.validation}
						valid={input.inputProps.valid}
						triedToSubmit={this.state.triedToSubmit}
					/>
				))}
				<Button btnType="Success" component={ContactData}>
					Order
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return <div>{form}</div>;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		ingredientList: state.burgerBuilder.ingredientList,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		purchaseBurgerStart: orderData => dispatch(orderActions.purchaseBurgerStart(orderData)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactData);
