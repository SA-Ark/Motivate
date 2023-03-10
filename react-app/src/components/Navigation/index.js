import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	let cName = "nav-link"
	if (!sessionUser){
		cName="logged-out-nav-link"
	}
	return (
		<div className="navigation">
				<NavLink exact to="/allgoals" className={cName}>MOTIVATE</NavLink>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
	);
}

export default Navigation;
