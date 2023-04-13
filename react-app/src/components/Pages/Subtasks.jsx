import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import CreateSubtaskModal from '../Modals/CreateSubtaskModal';
import CurrentSubtasksForTaskCard from '../Cards/CurrentSubtasksForTaskCard';
import OpenModalButton from '../OpenModalButton';
import { useParams, useHistory } from 'react-router-dom';
import { thunkFetchTaskById } from '../../store/task';


function SubTasks() {
  const history = useHistory();
  let tasks = useSelector(state => Object.values(state.tasks?.tasks))
  const goal = useSelector(state => state.goals?.singleGoal)
  const task = useSelector(state => state.tasks?.singleTask)
  const dispatch = useDispatch()
  let taskId
  taskId = useParams().taskId
  if(task?.parent_task_id && !taskId){

    taskId = task.parent_task_id
  }
  console.log(taskId, "taskId")
  useEffect(() => {
    dispatch(thunkFetchTaskById(task?.id)).then((task) => {
       dispatch(thunkFetchAllTasksByGoalId(task?.goal_id))
      })
  }, [dispatch, tasks?.length])
  const backToParentTask = () => {
    history.push(`/tasks/${taskId}`)
  }
  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New SubTask"
          modalComponent={
            <CreateSubtaskModal parentTaskId={taskId} goalId={task?.goal_id} />}
        />
      </div>
      <h1 className="all-goal-title">Current SubTasks For {task?.name}</h1>
      <button onClick={backToParentTask}>Back to Parent Task</button>
      <CurrentSubtasksForTaskCard tasks={tasks} taskId={parseInt(taskId)} />

    </div>
  );
}

export default SubTasks;
