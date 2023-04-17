import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import CreateTaskModal from '../Modals/CreateTaskModal';
import CurrentTasksForGoalCard from '../Cards/CurrentTasksForGoalCard';
import OpenModalButton from '../OpenModalButton';
import { useParams, useHistory } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';


function HabitTasks() {
  const tasks = useSelector(state => Object.values(state.tasks?.tasks))
  const goal = useSelector(state => state.goals?.singleGoal)
  const history = useHistory()
  const dispatch = useDispatch()
  const { goalId } = useParams()
  useEffect(() => {
    dispatch(thunkFetchAllTasksByGoalId(goalId))
    dispatch(thunkFetchGoalById(goalId))

  }, [dispatch, tasks?.length])

  const backToHome = () => {
    history.push(`/home`)
  }

  return (
    <div className="all-goals-page">
      <h1 className="all-goal-title">Current Daily Tasks </h1>
        <button onClick={backToHome}> Back To Home</button>
      <CurrentTasksForGoalCard tasks={tasks} />

    </div>
  );
}

export default HabitTasks;
