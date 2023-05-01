import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import {Sidebar} from './Sidebar';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	let cName = "nav-link"
	if (!sessionUser){
		cName="logged-out-nav-link"
	}
	return (
		<>

		<div className="navigation">
				<NavLink exact to="/home" className={cName}>MOTIVATE</NavLink>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
		</div>
		{sessionUser &&
		<Sidebar/>
}
		</>
	);
}

export default Navigation;
