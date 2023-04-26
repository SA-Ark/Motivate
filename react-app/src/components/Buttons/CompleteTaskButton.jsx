import { thunkCompleteTask } from "../../store/task";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkFetchAllTasksByGoalId, thunkCreateTask } from "../../store/task";
import { thunkFetchGoalById } from "../../store/goal";
import { useEffect } from "react";

const CompleteTaskButton = ({task})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(state => Object.values(state.tasks?.tasks))
    const goal = useSelector(state => state.goals?.singleGoal)
    let remaining_tasks = tasks
    useEffect(()=>{
        console.log(task?.goal_id)
        dispatch(thunkFetchAllTasksByGoalId(task?.goal_id))
        dispatch(thunkFetchGoalById(task?.goal_id))

    }, [dispatch, task?.goal_id])





    remaining_tasks = remaining_tasks.filter((eachTask) => eachTask?.parent_task_id === task?.id && eachTask?.finished_on === null)


    const handleSubmit = async ()=>{

        if (goal?.recurring_goal === true){
            console.log("recur")
            const newTask = {}
            newTask.name = task?.name
            newTask.description = task?.description
            newTask.difficulty = task?.difficulty
            newTask.priority = task?.priority
            newTask.tags = task?.tags
            newTask.due_date = task?.due_date
            let moment = require('moment-timezone');
            console.log(newTask.due_date, "due date 1")
            let due_date = moment.tz(newTask.due_date, 'ddd, DD MMM YYYY HH:mm:ss [GMT]', moment.tz.guess());
            if (goal?.name === "dailyGoal"){
                due_date = due_date.add(1, 'days')
            } else if (goal?.name === "weeklyGoal"){
                due_date = due_date.add(1, 'weeks')
            } else if (goal?.name === "monthlyGoal"){
                due_date = due_date.add(1, 'months')
            } else if (goal?.name === "yearlyGoal"){
                due_date = due_date.add(1, 'years')
            }

            newTask.due_date = due_date.format('YYYY-MM-DDTHH:mm')


            dispatch(thunkCreateTask(newTask, +goal?.id))


            // dispatch(thunkCreateTask(newTask, +goal?.id))
        }
       history.push(`/goals/finishedtasks/${task?.goal_id}`)
        dispatch(thunkCompleteTask(task?.id))

    }

    return (
        <div>


        {remaining_tasks?.length?
        <button title="Complete All Subtasks First!" type="button" className='greyed-out'>
            Complete Task
        </button>:

        <button onClick={handleSubmit} type="button">
            Complete Task
        </button>
           }
           </div>
    )
}


export default CompleteTaskButton
