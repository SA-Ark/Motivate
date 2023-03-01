import { thunkDeleteGoal } from "../../store/goal";
import { useHistory } from "react-router-dom";
import {useDispatch } from "react-redux";
const DeleteGoalButton = ({goalId}) => {
    const history = useHistory();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(thunkDeleteGoal(goalId))

        history.push("/allgoals")

    }

    return (
        <>
            <button onClick={handleSubmit} type="button">Delete Goal</button>
        </>
    )
}

export default DeleteGoalButton;
