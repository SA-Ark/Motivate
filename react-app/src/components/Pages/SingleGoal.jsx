import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';

function SingleGoal() {
    const singleGoal = useSelector(state=>state.goals?.singleGoal)
    const {id} = useParams()


    // const [goals, setGoals] = useState(Object.values(allGoals));
    let goal = singleGoal
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(thunkFetchGoalById(id))

      console.log(goal, "GOAL")
    }, [dispatch])


    if(singleGoal?.length){
      console.log("Hi")
      goal = singleGoal
    }


  return (
    <div>
      <h1>{goal?.name}</h1>

        <div key={goal?.id}>
          <h3>{goal?.name}</h3>
          <p>{goal?.description}</p>
          <p>Difficulty: {goal?.difficulty}</p>
          <p>Importance: {goal?.importance}</p>
          <p>Tags: {goal?.tags}</p>
          <p>Due Date: {goal?.due_date}</p>
          <p>Finished On: {goal?.finished_on}</p>
        </div>

    </div>
  );
}

export default SingleGoal;
