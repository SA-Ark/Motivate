import { thunkCompleteTask } from "../../store/task";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkFetchTaskById } from "../../store/task";
import { useEffect } from "react";

const CompleteSubtaskButton = ({task})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{


    }, [])

    const handleSubmit = async ()=>{

        dispatch(thunkCompleteTask(task?.id))
        history.push(`/tasks/subtasks/finished/${task?.parent_task_id}`)



    }

    return (
        <button onClick={handleSubmit} type="button">
            Complete task
        </button>
    )
}

export default CompleteSubtaskButton
