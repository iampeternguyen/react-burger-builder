import React from 'react';
import cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
// for boolean props you don't have to set it like this

/* <NavigationItem link="/" active={true}> */

const navigationItems = props => (
	<ul className={cssClasses.NavigationItems}>
		<NavigationItem link="/">Burger Builder</NavigationItem>
		{props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
		{props.isAuth ? (
			<NavigationItem link="/logout">Logout</NavigationItem>
		) : (
			<NavigationItem link="/auth">Sign Up</NavigationItem>
		)}
	</ul>
);

export default navigationItems;
