import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';

function SingleGoal() {
    const singleGoal = useSelector(state=>state.goals?.singleGoal)
    const dispatch = useDispatch()
    const {id} = useParams()
    let goal = singleGoal

    useEffect(()=>{
      dispatch(thunkFetchGoalById(id))


    }, [dispatch, id])


    if(singleGoal?.length){
      goal = singleGoal
    }


  return (
    <div>
      <h1>{goal?.name}</h1>

        <div key={goal?.id}>
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
