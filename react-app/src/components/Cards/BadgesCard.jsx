
import { useHistory } from "react-router-dom";
function BadgesCard({ badges }) {
  const history = useHistory();

  const onClick = (badge) => {
    history.push(`/badges/${badge?.id}`)
  }

  return (
    <div>
      {badges?.map((badge, index) => (
        <div key={badge?.id || index}
          className="all-goals-card card"
          onClick={() => onClick(badge)} >
          <h3>{badge?.name}</h3>
          <p>{badge?.description}</p>
          {/* <p>Importance & Difficulty: {badge?.importance ||"unspecified importance"} and {badge?.difficulty || "unspecified difficulty"}</p>
              <p>Due Date: {badge?.due_date || "unspecified"}</p>
              <p>Finished On: {badge.finished_on}</p> */}

        </div>
      ))}
    </div>
  )
}

export default BadgesCard
