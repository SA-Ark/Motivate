
import { useHistory } from "react-router-dom";

function FinishedTasksCard({ tasks }) {
  const history = useHistory();

  const onClick = (task) => {
    history.push(`/tasks/${task?.id}`)
  }
  tasks = tasks.filter(task => task.finished_on !== null && task.parent_task_id === null)
  return (

    <div>
      {!tasks.length && <h3>No Finished Tasks For This Goal</h3>}
      {tasks?.map((task, index) => (
        <div key={task?.id || index}
          className="all-goals-card"
          onClick={() => onClick(task)} >
          <h3>{task?.name}</h3>
          <p>Description: {task?.description}</p>
          <p>priority & Difficulty: {task?.priority || "unspecified priority"} and {task?.difficulty || "unspecified difficulty"}</p>
          <p>Due Date: {task?.due_date || "unspecified"}</p>

        </div>
      ))}
    </div>
  )
}

export default FinishedTasksCard
