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
        
        if(task?.goal_id){
        dispatch(thunkFetchAllTasksByGoalId(task?.goal_id))
        dispatch(thunkFetchGoalById(task?.goal_id))
        }

    }, [dispatch, task?.goal_id])





    remaining_tasks = remaining_tasks.filter((eachTask) => eachTask?.parent_task_id === task?.id && eachTask?.finished_on === null)


    const handleSubmit = async ()=>{

        if (goal?.recurring_goal === true){

            const makeTaskCopy = async (task, parentTaskId) => {
            const newTask = {}
            newTask.name = task?.name
            newTask.description = task?.description
            newTask.difficulty = task?.difficulty
            newTask.priority = task?.priority
            newTask.tags = task?.tags
            if(parentTaskId){

                newTask.parent_task_id = parentTaskId
            }
            let moment = require('moment-timezone');
            if (task?.due_date){
            newTask.due_date = task?.due_date
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
        }

            // const res = await dispatch(thunkCreateTask(newTask, +goal?.id))

            // return res

           const res = await dispatch(thunkCreateTask(newTask, +goal?.id))

        const subtasks = tasks.filter(subtask => subtask.parent_task_id === task.id);
        for (let subtask of subtasks) {
            await makeTaskCopy(subtask, res?.id);
            }


            }



            //     const orderedTasks = []


            //     function getAllSubtasks(task, allTasks) {
            //         // Add the current task to the list of all tasks
            //         allTasks.push(task);

            //         // Recursively get all subtasks of the current task
            //         const subtasks = tasks.filter(eachTask => eachTask.parent_task_id === task.id)
            //         if (subtasks?.length) {
            //           for (let i = 0; i <  subtasks.length; i++) {
            //             getAllSubtasks(subtasks[i], allTasks);
            //           }
            //         }

            //         return allTasks;
            //       }


            //     const finalTasks = getAllSubtasks(task, orderedTasks)



            //     console.log(finalTasks.length, "O LEN")
            //     let newTask
            // for (let i = 0; i < finalTasks.length; i++){
            //     if (newTask){
            //         console.log(newTask?.id, "THIS IS IDDDD", newTask)
            //         newTask = await makeTaskCopy(finalTasks[i], newTask?.id)
            //         console.log("id", newTask)

            //     }else{

            //         newTask = await makeTaskCopy(finalTasks[i])
            //         console.log("noid", newTask)
            //     }

            // }
            await makeTaskCopy(task)
            dispatch(thunkCompleteTask(task?.id))
            history.push(`/home`)
        }else{

            dispatch(thunkCompleteTask(task?.id))
            history.push(`/goals/finishedtasks/${task?.goal_id}`)
        }

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
