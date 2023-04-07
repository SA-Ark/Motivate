import EditGoalModal from '../Modals/EditGoalModal';
import DeleteGoalButton from '../Buttons/DeleteGoalButton';
import OpenModalButton from '../OpenModalButton';
import CreateChildGoalModal from '../Modals/CreateChildGoalModal';
import EditGoalNoteModal from '../Modals/EditGoalNote';
import CompleteGoalButton from '../Buttons/CompleteGoalButton';
import { thunkFetchGoalById } from '../../store/goal';
import { thunkFetchNoteByGoalId } from '../../store/goalNote';
import { useDispatch, useSelector,  } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import GoalCard from './GoalCard';

function BadgeCard({ badge }) {
  const goal = useSelector(state=>state.goals?.singleGoal)
  const dispatch = useDispatch()
  const history = useHistory()
useEffect(()=>{

      // dispatch(thunkFetchNoteByGoalId(badge?.goal_id))
      dispatch(thunkFetchGoalById(badge?.goal_id))

    },[dispatch, badge?.goal_id])




    const goToChildGoal = ()=>{
      history.push(`/goals/${goal?.child_goal_id}`)
    }

     const seeChainedGoals = ()=>{
      history.push(`/goals/${goal?.id}/parentgoals`)
    }
  return (
    <div className="goal-card" key={badge?.id}>
      <p>Description: {badge?.description}</p>
      <p>Completed On: {goal?.finished_on}</p>
      <p>Badge Level: {badge?.level}</p>



      <div>
        {!goal?.child_goal_id?
        <OpenModalButton
        buttonText="Create a Chained Goal"
        modalComponent={
          <CreateChildGoalModal parentGoalId={goal?.id} />}
          />
        : <button onClick={goToChildGoal}>Go To Next Goal</button>}
        <button onClick={seeChainedGoals}>See Previous Goals</button>
        </div>

    </div>
  )
}

export default BadgeCard
