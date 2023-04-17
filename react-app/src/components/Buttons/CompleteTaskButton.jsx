import { thunkCompleteTask } from "../../store/task";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkFetchTaskById } from "../../store/task";
import { useEffect } from "react";

const CompleteTaskButton = ({task})=>{
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = async ()=>{

       history.push(`/goals/finishedtasks/${task?.goal_id}`)
    dispatch(thunkCompleteTask(task?.id))

    }

    return (
        <button onClick={handleSubmit} type="button">
            Complete task
        </button>
    )
}

export default CompleteTaskButton
