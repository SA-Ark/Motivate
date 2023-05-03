
import { useHistory } from "react-router-dom";

function UpcomingTasksCard({ tasks }) {


  const history = useHistory();

  const onClick = (task) => {


    history.push(`/goals/upcoming/${task?.id}`)

  }



 let  tasks2 = tasks?.filter(task => task.finished_on === null && task.parent_task_id === null)

  if (tasks2?.length) {

    return (

      <div>
        {tasks2?.map((task, index) => (
          <div key={task?.id || index}
            className="all-goals-card card"
            onClick={() => onClick(task)} >
            <h3>{task?.name}</h3>
            <p>Description: {task?.description}</p>
            <p>priority & Difficulty: {task?.priority || "unspecified priority"} and {task?.difficulty || "unspecified difficulty"}</p>
            <p>Due Date: {new Date(task?.due_date)?.toLocaleString() || "unspecified"}</p>

          </div>
        ))}
      </div>

    )
  }
  else if (!tasks2?.length ) {
    return (
     null
    )
  }
}

export default UpcomingTasksCard
