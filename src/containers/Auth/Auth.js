import React, { Component } from 'react';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import cssClasses from './Auth.css';
import * as authActions from '../../store/actions/auth';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import AxiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
	state = {
		form: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
			},
		},
		triedToSubmit: false,
		isSignUpPage: true,
	};

	submitFormHandler = event => {
		event.preventDefault();
		this.setState({
			triedToSubmit: true,
		});

		let formIsValid = true;

		for (let key in this.state.form) {
			formIsValid = this.state.form[key].valid && formIsValid;
		}

		if (formIsValid) {
			const email = this.state.form.email.value;
			const password = this.state.form.password.value;
			this.props.authenticateUser(email, password, this.state.isSignUpPage);
		}
	};

	inputChangedHandler = (event, key) => {
		const updatedForm = {
			...this.state.form,
			[key]: {
				...this.state.form[key],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.form[key].validation),
			},
		};

		this.setState({
			form: updatedForm,
		});
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	switchAuthModeHandler = event => {
		event.preventDefault();
		this.setState(prevState => {
			return {
				isSignUpPage: !prevState.isSignUpPage,
			};
		});
	};

	render() {
		let formArray = [];
		for (let key in this.state.form) {
			formArray.push({
				id: key,
				inputProps: this.state.form[key],
			});
		}

		let form = this.props.loading ? (
			<Spinner />
		) : (
			<form className={cssClasses.Auth} onSubmit={this.submitFormHandler}>
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
				{this.props.error ? <p>ERROR: {String(this.props.error).toLowerCase()}</p> : null}
				<Button btnType="Success">{this.state.isSignUpPage ? 'Sign Up' : 'Sign In'}</Button>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					Switch to {this.state.isSignUpPage ? 'Sign In' : 'Sign Up'}
				</Button>
			</form>
		);

		if (this.props.isAuth) {
			form = <p>Logged in</p>;
			this.props.history.push('/orders');
		}
		return <div>{form} </div>;
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authenticateUser: (email, password, isSignUp) => dispatch(authActions.authStart(email, password, isSignUp)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth, AxiosOrders);
