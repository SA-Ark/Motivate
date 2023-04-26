import { thunkCompleteGoal } from "../../store/goal";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkGetAllBadges } from "../../store/badge";
import { useEffect } from "react";
import { thunkFetchAllTasksByGoalId } from "../../store/task";

const CompleteGoalButton = ({goalId})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(state => Object.values(state.tasks?.tasks))
    let remaining_tasks = tasks
    useEffect(()=>{

        dispatch(thunkFetchAllTasksByGoalId(goalId))
    }, [dispatch, goalId])
    remaining_tasks =  remaining_tasks.filter((task) => task?.goal_id === goalId && task.finished_on === null)
    const handleSubmit = async ()=>{
      const res = await dispatch(thunkCompleteGoal(goalId))
        let badges = await dispatch(thunkGetAllBadges())
        const badge = Object.values(badges).filter(badge=>badge.goal_id === goalId)
        if (badge){

          history.push(`/badges/${badge[0]?.id}`)
        }


    }

    return (
        <div>


        {remaining_tasks?.length?
        <button title="Complete All Tasks First!" type="button" className='greyed-out'>
            Complete Goal
        </button>:
        <button onClick={handleSubmit} type="button">
            Complete Goal
        </button>
                   }
                   </div>
    )
}

export default CompleteGoalButton
