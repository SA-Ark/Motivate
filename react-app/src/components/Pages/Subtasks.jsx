import React, { useEffect, useState } from 'react';
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
  const task = useSelector(state => state.tasks?.singleTask)
  const dispatch = useDispatch()
  let taskId
  taskId = useParams().taskId
  if (task?.parent_task_id && !taskId) {

    taskId = task.parent_task_id
  }

  if (!task?.id) {
    taskId = taskId
  }
  tasks = tasks.filter(task => task?.parent_task_id === +taskId)
  const searchTerm = useSelector(state => state.search?.searchTerm)?.toLowerCase()
  let [t2, setT2] = useState(tasks)

  if (tasks && !searchTerm &&
    JSON.stringify(t2) !== JSON.stringify(tasks)) {
    setT2(tasks)
  }


  useEffect(() => {
    dispatch(thunkFetchTaskById(taskId)).then((task) => {
      dispatch(thunkFetchAllTasksByGoalId(task?.goal_id))
    }).then(() => {

      if (searchTerm) {
        console.log("ST")
        setT2(tasks.filter((task) => task.name.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm)))
      } else {
        console.log("else")
        setT2(tasks)
      }
    })
  }, [dispatch, searchTerm])
  const backToParentTask = () => {
    history.push(`/tasks/${taskId}`)
  }

  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New SubTask"
          modalComponent={
            <CreateSubtaskModal parentTask={task} goalId={task?.goal_id} />}
        />
      </div>
      <h1 className="all-goal-title">Current SubTasks For {task?.name}</h1>
      <button onClick={backToParentTask}>Back to Parent Task</button>
      <CurrentSubtasksForTaskCard tasks={t2} taskId={parseInt(taskId)} />
      {!tasks.length && <h3>No Current Subtasks For This Task</h3>}
      {(tasks?.length && !t2?.length) ? <h3>No Tasks Match Search Criteria.</h3> : null}
    </div>
  );
}

export default SubTasks;
