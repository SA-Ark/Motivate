import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { thunkFetchAllTasksByGoalId } from '../../store/task';
import CreateTaskModal from '../Modals/CreateTaskModal';
import CurrentTasksForGoalCard from '../Cards/CurrentTasksForGoalCard';
import OpenModalButton from '../OpenModalButton';
import { useParams, useHistory } from 'react-router-dom';
import { thunkFetchGoalById } from '../../store/goal';


function Tasks() {
  const tasks = useSelector(state => Object.values(state.tasks?.tasks))
  const goal = useSelector(state => state.goals?.singleGoal)
  const history = useHistory()
  const dispatch = useDispatch()
  const { goalId } = useParams()
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

  }, [searchTerm])

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
      <h1 className="all-goal-title">Current Tasks For {goal?.name}</h1>
      <button onClick={backToGoal}> Back To Goal</button>
      <CurrentTasksForGoalCard tasks={t2} />
      {!tasks.length && <h3>No Current Tasks For This Goal</h3>}
      {(tasks?.length && !t2?.length) ? <h3>No Tasks Match Search Criteria.</h3> : null}
    </div>
  );
}

export default Tasks;
