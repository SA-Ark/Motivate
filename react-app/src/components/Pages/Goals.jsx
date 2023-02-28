import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals } from '../../store/goal';
import CreateGoalForm from '../Forms/CreateGoalForm';
import AllGoalsCard from '../Cards/AllGoalsCard';
function Goals() {
    const goals = useSelector(state=>Object.values(state.goals?.goals))
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkFetchAllGoals())


    }, [dispatch, goals.length])


  return (
    <div>
      <h1>All Goals</h1>
     <AllGoalsCard goals={goals}/>
        <div>
        <CreateGoalForm />
        </div>
    </div>
  );
}

export default Goals;
