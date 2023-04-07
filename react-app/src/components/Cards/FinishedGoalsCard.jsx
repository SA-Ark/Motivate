
import { useHistory } from "react-router-dom";
function FinishedGoalsCard ({goals}){
    const history = useHistory();

    const onClick = (goal)=>{
        history.push(`/goals/${goal?.id}`)
    }
   
    return (
        <div>
          {goals?.map((goal, index) => (
            <div key={goal?.id || index}
            className="all-goals-card"
            onClick={()=> onClick(goal)} >
              <h3>{goal?.name}</h3>
              <p>Description: {goal?.description}</p>
              <p>Importance & Difficulty: {goal?.importance ||"unspecified importance"} and {goal?.difficulty || "unspecified difficulty"}</p>
              <p>Due Date: {goal?.due_date || "unspecified"}</p>

            </div>
          ))}
            </div>
                )
}

export default FinishedGoalsCard
