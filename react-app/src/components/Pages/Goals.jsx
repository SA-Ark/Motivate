import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals } from '../../store/goal';
import CreateGoalForm from '../Forms/CreateGoalForm';

function Goals() {
    const allGoals = useSelector(state=>state.goals?.goals)

    // const [goals, setGoals] = useState(Object.values(allGoals));
    let goals = Object.values(allGoals)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkFetchAllGoals())

      console.log(goals, "GOALS")
    }, [dispatch])


    if(allGoals?.length){
      console.log(Object.values(allGoals))
        goals = Object.values(allGoals)
    }



  return (
    <div>
      <h1>All Goals</h1>
      {goals?.map(goal => (
        <div key={goal.id}>
          <h3>{goal.name}</h3>
          <p>{goal.description}</p>
          <p>Difficulty: {goal.difficulty}</p>
          <p>Importance: {goal.importance}</p>
          <p>Tags: {goal.tags}</p>
          <p>Due Date: {goal.due_date}</p>
          <p>Finished On: {goal.finished_on}</p>
        </div>
      ))}
        <div>
        <CreateGoalForm />
        </div>
    </div>
  );
}

export default Goals;
