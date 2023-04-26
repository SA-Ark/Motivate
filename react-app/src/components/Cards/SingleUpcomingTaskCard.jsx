import EditTaskModal from '../Modals/EditTaskModal';
import DeleteTaskButton from '../Buttons/DeleteTaskButton';
import OpenModalButton from '../OpenModalButton';
import EditTaskNoteModal from '../Modals/EditTaskNote';
import CompleteSubtaskButton from '../Buttons/CompleteSubtaskButton';
import CompleteTaskButton from '../Buttons/CompleteTaskButton';
import { thunkFetchGoalById } from '../../store/goal';
import { thunkFetchTaskById } from '../../store/task';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function SingleUpcomingTaskCard() {

  const history = useHistory();
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks?.singleTask)
  const goal = useSelector(state => state.goals?.singleGoal)
  const {id} = useParams()
  useEffect(()=>{
    dispatch(thunkFetchTaskById(id))
  }, [dispatch, id])

    useEffect(()=>{
  dispatch(thunkFetchGoalById(task?.goal_id))
    }, [dispatch, task?.goal_id])



  const tasks = ()=>{
    history.push(`/goals/tasks/${task?.goal_id}`)
  }
  const currSubtasks = ()=>{
    history.push(`/tasks/subtasks/${task?.id}`)
  }

  const upcomingTasks = ()=>{
    history.push(`/goals/upcoming/${task?.goal_id}/${goal.name.slice(0, goal.name.length-4)}`)
  }

  const parentTask = ()=>{
    history.push(`/tasks/${task?.parent_task_id}`)
  }

  const goToGoal = ()=>{
    history.push(`/goals/${task?.goal_id}`)
  }

  const home = ()=>{
    history.push(`/home`)
  }

  return (
    <div className="goal-card" key={task?.id}>
      <p>Description: {task?.description}

      </p>

      <p>Difficulty: {task?.difficulty || "unspecified"}</p>
      <p>Priority: {task?.priority ||"unspecified" }</p>
      {/* <p>Tags: {task?.tags || "no tags"}</p> */}
      <p>Due Date: {task?.due_date || "unspecified"}</p>
      {/* <p>{task?.completion_percent}</p> */}
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

      <button onClick={currSubtasks}>See Current Subtasks For This Task</button>

        {
          task?.parent_task_id &&

      <button onClick={parentTask}>Go To Parent Task</button>
        }
      {!goal?.recurring_goal?
      <button onClick={goToGoal}>Go To Goal</button>
      :
      <button onClick={home}>Go To Home</button>
}
      </>
}
<div>
  {!goal?.recurring_goal?
      <button onClick={tasks}>Back to Current Tasks For This Goal</button>:
      <button onClick={upcomingTasks}>Back to Upcoming Tasks</button>

  }
      <OpenModalButton
      buttonText="View & Update Notes"
        modalComponent={
        <EditTaskNoteModal taskId={task?.id} />}
        />
      </div>
    </div>
  )
}

export default SingleUpcomingTaskCard
