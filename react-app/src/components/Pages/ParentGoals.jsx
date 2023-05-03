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
          const data = await dispatch(thunkFetchGoalById(id))
          .then((data) =>{

            setGoals(prevGoals => [...prevGoals, data]);
            if (data?.parent_goal_id){

              fetchParentGoals(data?.parent_goal_id);
            }

        })


        }
      }

      fetchParentGoals(goalId);
    }, [dispatch, goalId]);

    const searchTerm = useSelector(state => state.search?.searchTerm)?.toLowerCase()
    let [g2, setG2] = useState(goals)

    useEffect(()=>{


      if (goals && !searchTerm &&
      JSON.stringify(g2) !== JSON.stringify(goals)) {
      setG2(goals)

    }

    if (searchTerm) {

      setG2(goals.filter((goal) => goal.name.toLowerCase().includes(searchTerm) || goal.description.toLowerCase().includes(searchTerm)))
    } else {

      setG2(goals)
    }
    }, [dispatch, searchTerm, goals])





  return (
    <div className="all-goals-page">
      <div className="create-goal-button">
        <OpenModalButton
          buttonText="Create New Goal"
          modalComponent={<CreateGoalModal />}
        />
      </div>
      <h1 className="all-goal-title">Previously Completed Goals For This Badge</h1>
      {(goals?.length && !g2?.length) ? <h3>No Completed Goals Match Search Criteria.</h3> : null}
      <FinishedGoalsCard goals={g2} />
    </div>
  );

}

export default ParentGoals;
