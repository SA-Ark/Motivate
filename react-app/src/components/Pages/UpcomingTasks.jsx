import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import CreateTaskModal from '../Modals/CreateTaskModal';
import UpcomingTasksCard from '../Cards/UpcomingTasksCard';
import OpenModalButton from '../OpenModalButton';
import { useParams, useHistory } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';
import FinishedTasksCard from '../Cards/FinishedTasksCard';

function UpcomingTasks() {
  let tasks = useSelector(state => Object.values(state.tasks?.tasks))
  const goal = useSelector(state => state.goals?.singleGoal)
  const history = useHistory()
  const dispatch = useDispatch()
  const { goalId, recurring } = useParams()

  const currDate = new Date()
  const moment = require('moment-timezone');
  const currTimezone = moment.tz.guess();


  tasks = tasks?.filter((task)=> task.goal_id === +goalId && task.finished_on === null && task.parent_task_id == null)

  tasks = tasks?.filter((task)=>{
    let due_date = moment.tz(task.due_date, "ddd, DD MMM YYYY HH:mm:ss z", currTimezone);
     let milliseconds = due_date - currDate
      if ( (recurring=== "daily" && milliseconds > 86400000)
      || (recurring=== "weekly" && milliseconds > 604800000)
      || (recurring=== "monthly" && milliseconds > 2629746000)
      || (recurring=== "yearly" && milliseconds > 31556952000) ){
       return task
   }


})




  const searchTerm = useSelector(state => state.search?.searchTerm)?.toLowerCase()
  let [t2, setT2] = useState(tasks)

  if (tasks && !searchTerm &&
    JSON.stringify(t2) !== JSON.stringify(tasks)) {
    setT2(tasks)
  }


  useEffect(() => {
    dispatch(thunkFetchGoalById(goalId))
    dispatch(thunkFetchAllTasksByGoalId(goalId))
    .then(() => {

      if (searchTerm) {

        setT2(tasks.filter((task) => task.name.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm)))
      } else {

        setT2(tasks)
      }
    })

  }, [dispatch, searchTerm])
  const backToGoal = () => {
    history.push(`/goals/${goalId}`)
  }

  const backToHome = () => {
    history.push(`/home`)
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
      <h1 className="all-goal-title">Upcoming Tasks For {goal?.name}</h1>
      { goal?.recurring_goal?
      <button onClick={backToHome}> Back To Home</button>:
      <button onClick={backToGoal}> Back To Goal</button>}
      <UpcomingTasksCard tasks={t2} />
      {!tasks.length && <h3>No Upcoming Tasks For This Goal</h3>}
      {(tasks?.length && !t2?.length) ? <h3>No Upcoming Tasks Match Search Criteria.</h3> : null}
    </div>
  );
}

export default UpcomingTasks;
