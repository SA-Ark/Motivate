import EditGoalModal from '../Modals/EditGoalModal';
import DeleteGoalButton from '../Buttons/DeleteGoalButton';
import OpenModalButton from '../OpenModalButton';
import EditGoalNoteModal from '../Modals/EditGoalNote';
import CompleteGoalButton from '../Buttons/CompleteGoalButton';
import { useHistory } from 'react-router-dom';
import CreateTaskModal from '../Modals/CreateTaskModal';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllBadges } from '../../store/badge';
import { useEffect } from 'react';
function GoalCard({ goal }) {
  const history = useHistory();
  const dispatch = useDispatch()
  let id;
  useEffect(()=>{
    dispatch(thunkGetAllBadges())
  }, [dispatch]
  )
  const badges = useSelector(state => Object.values(state.badges?.badges))
    badges.forEach((badge)=>{
      if(badge?.goal_id === goal?.id){
        id = badge?.id
      }
    })

  const tasks = ()=>{
    history.push(`/goals/tasks/${goal?.id}`)
  }

  const finishedTasks = ()=>{
    history.push(`/goals/finishedtasks/${goal?.id}`)
  }

  const backToBadge = ()=>{
    history.push(`/badges/${id}`)
  }

  return (
    <div className="goal-card" key={goal?.id}>
      <p>Description: {goal?.description}

      </p>

      <p>Difficulty: {goal?.difficulty || "unspecified"}</p>
      <p>Importance: {goal?.importance ||"unspecified" }</p>
      {/* <p>Tags: {goal?.tags || "no tags"}</p> */}
      <p>Due Date: {goal?.due_date || "unspecified"}</p>
      {/* <p>{goal?.completion_percent}</p> */}
      {goal?.finished_on && <p>Finished On: {goal.finished_on}</p>}

      {
      goal?.finished_on?
      <button onClick={backToBadge}>Go Back To The Badge For This Goal</button>:
      <>
      <div>
        <OpenModalButton
        buttonText="Edit Goal"
        modalComponent={
        <EditGoalModal id={goal?.id} />
        }
        />
      </div>

      <div>

        <DeleteGoalButton goalId={goal?.id} />

      </div>


      <CompleteGoalButton goalId={goal?.id}/>
      <button onClick={tasks}>See Current Tasks For This Goal</button>
      <OpenModalButton
        buttonText="Create New Task"
        modalComponent={
          <CreateTaskModal goalId={goal?.id}/>}
          />
      </>
}
<div>
<button onClick={finishedTasks}>See Finished Tasks</button>
      <OpenModalButton
      buttonText="View & Update Notes"
        modalComponent={
        <EditGoalNoteModal goalId={goal?.id} />}
        />
      </div>
    </div>
  )
}


export default GoalCard
