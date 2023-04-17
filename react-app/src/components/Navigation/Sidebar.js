import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import searchIcon from '../../Images/search.png'
import { useSelector, useDispatch } from 'react-redux';
import { actionSetValues } from '../../store/search';



function Sidebar() {

  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const dispatch = useDispatch()


// useEffect(()=>{
//   setSearchTerm('')
// }, [dispatch, location])

useEffect(()=>{
  setSearchTerm('')
  dispatch(actionSetValues({ searchTerm : ""}))

}, [dispatch, location])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)


  };

  const handleSearchClick = () => {

  dispatch(actionSetValues({ searchTerm}))

  };

const goal_tasks = /\/goals\/tasks\/(\d+)/;
const finished_goal_tasks = /\/goals\/finishedtasks\/(\d+)/;
const subtasks = /\/tasks\/subtasks\/(\d+)/;
const finished_subtasks = /\/tasks\/subtasks\/finished\/(\d+)/;
const parent_goals = /\/goals\/(\d+)\/parentgoals/;
let match = false
if(
  location.pathname.match(goal_tasks)
  || location.pathname.match(finished_goal_tasks)
  || location.pathname.match(subtasks)
  || location.pathname.match(finished_subtasks)
  ||location.pathname.match(parent_goals)

){
  match = true;
}



  return (
    <nav>
        <ul className="nav-menu">
        <li className="nav-menu-links"><Link to="/home">Home</Link></li>
        <li className="nav-menu-links"><Link to="/allgoals">Goals</Link></li>
        <li className="nav-menu-links"><Link to="/badges">Badges</Link></li>
      </ul>
      {(location.pathname === "/allgoals"
      || location.pathname === "/goals/:goalId/parentgoals"
      || location.pathname === "/badges"
     || match
      || location.pathname === "/home")
      &&
      <div className="search-bar">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />

            <img className="search-button image" onClick={handleSearchClick}
            src={searchIcon} alt="Search" />
      </div>
}
    </nav>
  );
}

// export {names, descriptions, Sidebar};

export {Sidebar};
