import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllGoals, thunkFetchGoalById } from '../../store/goal';
import CreateGoalModal from '../Modals/CreateGoalModal';
import FinishedGoalsCard from '../Cards/FinishedGoalsCard';
import OpenModalButton from '../OpenModalButton';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function ParentGoals() {
  const dispatch = useDispatch();
  const { goalId } = useParams();

    const [goals, setGoals] = useState([]);

    useEffect(() => {
      const fetchParentGoals = async (id) => {
        if (id) {
          const data = await dispatch(thunkFetchGoalById(id));

          setGoals(prevGoals => [...prevGoals, data]);
          fetchParentGoals(data.parent_goal_id);
        }
      }

      fetchParentGoals(goalId);
    }, [dispatch, goalId]);

    console.log(goals);




  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New Goal"
          modalComponent={<CreateGoalModal />}
        />
      </div>
      <h1 className="all-goal-title">Previously Completed Goals For This Badge</h1>

      <FinishedGoalsCard goals={goals} />
    </div>
  );

}

export default ParentGoals;
