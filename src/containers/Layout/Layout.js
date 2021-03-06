import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import cssClass from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	closeSideDrawerHandler = () => {
		this.setState({
			showSideDrawer: false,
		});
	};

	openSideDrawerHandler = () => {
		this.setState({
			showSideDrawer: true,
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar isAuth={this.props.isAuthenticated} openSideDrawerHandler={this.openSideDrawerHandler} />
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					closeSideDrawerHandler={this.closeSideDrawerHandler}
					showSideDrawer={this.state.showSideDrawer}
				/>
				<main className={cssClass.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
