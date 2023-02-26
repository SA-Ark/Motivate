import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals } from '../../store/goal';
import CreateGoalForm from '../Forms/CreateGoalForm';

function Goals() {
    const goals = useSelector(state=>Object.values(state.goals?.goals))
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkFetchAllGoals())


    }, [dispatch, goals.length])


  return (
    <div>
      <h1>All Goals</h1>
      {goals?.map((goal, index) => (
        <div key={goal?.id || index}>
          <h3>{goal?.name}</h3>
          <p>{goal?.description}</p>
          <p>Difficulty: {goal?.difficulty}</p>
          <p>Importance: {goal?.importance}</p>
          <p>Tags: {goal?.tags}</p>
          <p>Due Date: {goal?.due_date}</p>
          <p>Finished On: {goal?.finished_on}</p>
        </div>
      ))}
        <div>
        <CreateGoalForm />
        </div>
    </div>
  );
}

export default Goals;
