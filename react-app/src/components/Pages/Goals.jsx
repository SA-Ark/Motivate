import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals } from '../../store/goal';
import CreateGoalModal from '../Modals/CreateGoalModal';
import AllGoalsCard from '../Cards/AllGoalsCard';
import OpenModalButton from '../OpenModalButton';

function Goals() {
  const goals = useSelector(state => Object.values(state.goals?.goals))
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.search?.searchTerm)?.toLowerCase()
  let [g2, setG2] = useState(goals)

  if (goals && !searchTerm &&
    JSON.stringify(g2) !== JSON.stringify(goals)) {
    setG2(goals)
  }

  useEffect(() => {
    dispatch(thunkFetchAllGoals())
      .then(() => {

        if (searchTerm) {

          setG2(goals.filter((goal) => goal.name.toLowerCase().includes(searchTerm) || goal.description.toLowerCase().includes(searchTerm)))
        } else {

          setG2(goals)
        }
      })


  }, [dispatch, goals.length, searchTerm])


  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New Goal"
          modalComponent={
            <CreateGoalModal />}
        />
      </div>
      <h1 className="all-goal-title">All Goals</h1>
      <AllGoalsCard goals={g2} />
      {!goals?.length && <h3>No Goals Yet. Create a goal to get started.</h3>}
      {(goals?.length && !g2?.length) ? <h3>No Goals Match Search Criteria.</h3> : null}

    </div>
  );
}

export default Goals;
