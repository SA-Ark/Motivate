import EditGoalModal from '../Modals/EditGoalModal';
import DeleteGoalButton from '../Buttons/DeleteGoalButton';
import OpenModalButton from '../OpenModalButton';

import EditGoalNoteModal from '../Modals/EditGoalNote';
import CompleteGoalButton from '../Buttons/CompleteGoalButton';

function GoalCard({ goal }) {


  return (
    <div className="goal-card" key={goal?.id}>
      <p>Description: {goal?.description}

      </p>
      <p> {goal?.id}</p>
      <p>Difficulty: {goal?.difficulty || "unspecified"}</p>
      <p>Importance: {goal?.importance ||"unspecified" }</p>
      {/* <p>Tags: {goal?.tags || "no tags"}</p> */}
      <p>Due Date: {goal?.due_date || "unspecified"}</p>


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
      <div>
      <OpenModalButton
      buttonText="View & Update Notes"
        modalComponent={
        <EditGoalNoteModal goalId={goal?.id} />}
        />
      </div>
      <CompleteGoalButton goalId={goal?.id}/>
    </div>
  )
}

export default GoalCard
