import { thunkCompleteTask } from "../../store/task";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkFetchTaskById } from "../../store/task";
import { useEffect } from "react";

const CompleteTaskButton = ({taskId})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{


    }, [])

    const handleSubmit = async ()=>{
      const task = await dispatch(thunkFetchTaskById(taskId))
      .then((data)=> history.push(`/tasks/subtasks/finished/${data?.parent_task_id}`))
      const res = await dispatch(thunkCompleteTask(taskId))



    }

    return (
        <button onClick={handleSubmit} type="button">
            Complete task
        </button>
    )
}

export default CompleteTaskButton
