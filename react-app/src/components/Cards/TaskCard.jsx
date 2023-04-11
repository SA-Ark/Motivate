import EditTaskModal from '../Modals/EditTaskModal';
import DeleteTaskButton from '../Buttons/DeleteTaskButton';
import OpenModalButton from '../OpenModalButton';

import EditTaskNoteModal from '../Modals/EditTaskNote';
import CompleteTaskButton from '../Buttons/CompleteTaskButton';
import { useHistory } from 'react-router-dom';

function TaskCard({ task }) {
  const history = useHistory();
  const tasks = ()=>{
    history.push(`/goals/tasks/${task?.goal_id}`)
  }


  return (
    <div className="goal-card" key={task?.id}>
      <p>Description: {task?.description}

      </p>

      <p>Difficulty: {task?.difficulty || "unspecified"}</p>
      <p>Priority: {task?.priority ||"unspecified" }</p>
      {/* <p>Tags: {task?.tags || "no tags"}</p> */}
      <p>Due Date: {task?.due_date || "unspecified"}</p>
      {task?.finished_on && <p>Finished On: {task.finished_on}</p>}

      {
      task?.finished_on? null:
      <>
      <div>
        <OpenModalButton
        buttonText="Edit task"
        modalComponent={
        <EditTaskModal id={task?.id} />
        }
        />
      </div>

      <div>

        <DeleteTaskButton taskId={task?.id} />

      </div>


      <CompleteTaskButton taskId={task?.id}/>
      </>
}
<div>
      <button onClick={tasks}>See Current Tasks For This Goal</button>
      <OpenModalButton
      buttonText="View & Update Notes"
        modalComponent={
        <EditTaskNoteModal taskId={task?.id} />}
        />
      </div>
    </div>
  )
}

export default TaskCard
