import { thunkDeleteTask, thunkFetchTaskById } from "../../store/task";
import { useHistory } from "react-router-dom";
import {useDispatch } from "react-redux";

const DeleteTaskButton = ({taskId}) => {
    const history = useHistory();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = await dispatch(thunkFetchTaskById(taskId))
      .then((data)=>{
        history.push(`/goals/${data?.goal_id}`)
    } )
        const res = await dispatch(thunkDeleteTask(taskId))



    }

    return (
        <>
            <button onClick={handleSubmit} type="button">Delete task</button>
        </>
    )
}

export default DeleteTaskButton;
