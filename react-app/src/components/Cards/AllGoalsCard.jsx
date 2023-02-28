import EditGoalForm from '../Forms/EditGoalForm';
import DeleteGoalButton from '../Buttons/DeleteGoalButton';
import { useHistory } from "react-router-dom";
function AllGoalsCard ({goals}){
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
              <p>{goal?.importance ||"important"} and {goal?.difficulty || "easy"}</p>
              <p>Due Date: {goal?.due_date}</p>
              <div>
              <EditGoalForm id={goal?.id}/>
              </div>
              <div>
              <DeleteGoalButton goalId={goal?.id}/>
              </div>
            </div>
          ))}
            </div>
                )
}

export default AllGoalsCard
