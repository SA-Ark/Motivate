
import { useHistory } from "react-router-dom";

function CurrentSubtasksForTaskCard({ tasks, taskId }) {
  const history = useHistory();
  console.log(taskId, 'TID')
  const onClick = (task) => {


      history.push(`/tasks/${task?.id}`)

  }

  tasks = tasks.filter(task => task.finished_on === null && task.parent_task_id === taskId)

  if (tasks?.length){

  return (

    <div>

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

  )}
  else{
    return (
      <div>
        <h3>No Current Subtasks For This Task</h3>

      </div>
    )
  }
}

export default CurrentSubtasksForTaskCard
