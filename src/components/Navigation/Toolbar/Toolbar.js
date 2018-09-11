import React from 'react';
import cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../Toggle/Toggle';

const toolbar = props => (
	<header className={cssClasses.Toolbar}>
		<div className={cssClasses.MobileOnly}>
			<Toggle clicked={props.openSideDrawerHandler} />
		</div>
		<Logo height="80%" />
		<nav className={cssClasses.DesktopOnly}>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;
