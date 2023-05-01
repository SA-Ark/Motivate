
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllBadges } from "../../store/badge";
function FinishedGoalsCard({ goals }) {
  const history = useHistory();
  const dispatch = useDispatch()
  let id;
  useEffect(()=>{
    dispatch(thunkGetAllBadges())
  }, [dispatch]
  )
  const badges = useSelector(state => Object.values(state.badges?.badges))
    badges.forEach((badge)=>{
      if(badge?.goal_id === goals[0]?.id){
        id = badge?.id
      }
    })

  const onClick = (goal) => {
    history.push(`/goals/${goal?.id}`)
  }
  const backToBadge = () => {
    history.push(`/badges/${id}`)
  }

  return (
    <div>
      <button onClick={backToBadge}>Back To The Badge</button>
      {goals?.map((goal, index) => (
        <div key={goal?.id || index}
          className="all-goals-card card"
          onClick={() => onClick(goal)} >
          <h3>{goal?.name}</h3>
          <p>Description: {goal?.description}</p>
          <p>Importance & Difficulty: {goal?.importance || "unspecified importance"} and {goal?.difficulty || "unspecified difficulty"}</p>
          <p>Due Date: {new Date(goal?.due_date)?.toLocaleString() || "unspecified"}</p>

        </div>
      ))}
    </div>
  )
}

export default FinishedGoalsCard
