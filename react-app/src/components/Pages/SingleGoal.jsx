import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';
import GoalCard from '../Cards/GoalCard';

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

       <GoalCard goal={goal} />

    </div>
  );
}

export default SingleGoal;