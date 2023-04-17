
import { useHistory } from "react-router-dom";
function AllGoalsCard ({goals}){
    const history = useHistory();

    const onClick = (goal)=>{
        history.push(`/goals/${goal?.id}`)
    }
    goals = goals.filter(goal => goal.finished_on === null)
    return (
        <div>
          {goals?.map((goal, index) => (
            <div key={goal?.id || index}
            className="all-goals-card card card"
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

export default AllGoalsCard
