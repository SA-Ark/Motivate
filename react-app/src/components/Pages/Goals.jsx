import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals } from '../../store/goal';
import CreateGoalModal from '../Modals/CreateGoalModal';
import AllGoalsCard from '../Cards/AllGoalsCard';
import OpenModalButton from '../OpenModalButton';

function Goals() {
    const goals = useSelector(state=>Object.values(state.goals?.goals))
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkFetchAllGoals())


    }, [dispatch, goals.length])


  return (
    <div>
      <div>
        <OpenModalButton
        buttonText="Create New Goal"
        modalComponent={
        <CreateGoalModal />}
        />
        </div>
      <h1>All Goals</h1>
     <AllGoalsCard goals={goals}/>

    </div>
  );
}

export default Goals;
