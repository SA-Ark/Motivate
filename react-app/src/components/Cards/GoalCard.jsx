
function GoalCard({goal}){
    

    return (
        <div key={goal?.id}>
          <p>Description: {goal?.description}</p>
          <p>Difficulty: {goal?.difficulty}</p>
          <p>Importance: {goal?.importance}</p>
          <p>Tags: {goal?.tags}</p>
          <p>Due Date: {goal?.due_date}</p>
          <p>Finished On: {goal?.finished_on}</p>
        </div>
    )
}

export default GoalCard
