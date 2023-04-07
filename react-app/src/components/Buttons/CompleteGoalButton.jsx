import { thunkCompleteGoal } from "../../store/goal";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { thunkGetAllBadges } from "../../store/badge";
import { useEffect } from "react";

const CompleteGoalButton = ({goalId})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{

        // dispatch(thunkGetAllBadges())
    }, [])

    const handleSubmit = async ()=>{
      const res = await dispatch(thunkCompleteGoal(goalId))
        let badges = await dispatch(thunkGetAllBadges())
        const badge = Object.values(badges).filter(badge=>badge.goal_id === goalId)
        
      history.push(`/badges/${badge[0]?.id}`)
    }

    return (
        <button onClick={handleSubmit} type="button">
            Complete Goal
        </button>
    )
}

export default CompleteGoalButton
