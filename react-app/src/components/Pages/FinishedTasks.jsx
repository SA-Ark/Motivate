import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import CreateTaskModal from '../Modals/CreateTaskModal';
import CurrentTasksForGoalCard from '../Cards/CurrentTasksForGoalCard';
import OpenModalButton from '../OpenModalButton';
import { useParams, useHistory } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';
import FinishedTasksCard from '../Cards/FinishedTasksCard';

function FinishedTasks() {
  const tasks = useSelector(state => Object.values(state.tasks?.tasks))
  const goal = useSelector(state => state.goals?.singleGoal)
  const history = useHistory()
  const dispatch = useDispatch()
  const { goalId } = useParams()
  useEffect(() => {
    dispatch(thunkFetchAllTasksByGoalId(goalId))
    dispatch(thunkFetchGoalById(goalId))

  }, [dispatch, tasks?.length])
  const backToGoal = () => {
    history.push(`/goals/${goalId}`)
  }


  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New Task"
          modalComponent={
            <CreateTaskModal goalId={goalId} />}
        />
      </div>
      <h1 className="all-goal-title">Finished Tasks For {goal?.name}</h1>
      <button onClick={backToGoal}> Back To Goal</button>
      <FinishedTasksCard tasks={tasks} />

    </div>
  );
}

export default FinishedTasks;
