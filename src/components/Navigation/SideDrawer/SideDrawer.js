import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssClasses from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Wrapper';

const sideDrawer = props => {
	let sideDrawerClasses = [cssClasses.SideDrawer, cssClasses.Close];
	if (props.showSideDrawer) {
		sideDrawerClasses = [cssClasses.SideDrawer, cssClasses.Open];
	}

	return (
		<Aux>
			<Backdrop show={props.showSideDrawer} clicked={props.closeSideDrawerHandler} />
			<div className={sideDrawerClasses.join(' ')}>
				<div className={cssClasses.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
