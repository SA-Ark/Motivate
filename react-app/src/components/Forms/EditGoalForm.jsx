import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditGoal } from "../../store/goal";
const EditGoalForm = ({id}) => {
  console.log(id, "id")
  const dispatch = useDispatch();
  const history = useHistory();
  const goal = useSelector(state => state.goal?.goals[id]);
  const [errors, setErrors] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    difficulty: "",
    importance: "",
    tags: "",
    due_date: "",
    finished_on: ""
  });

  useEffect(() => {
    if (goal) {
      setFormValues({
        name: goal.name,
        description: goal.description,
        difficulty: goal.difficulty || "",
        importance: goal.importance || "",
        tags: goal.tags || "",
        due_date: goal.due_date || "",
        finished_on: goal.finished_on || ""
      });
    }
  }, [goal]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(thunkEditGoal(id, formValues));
    if (data?.errors) {
      setErrors(data?.errors);
      history.push("/allgoals")
    } else {
    history.push(`/goals/${data.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formValues.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <input
          type="text"
          name="difficulty"
          id="difficulty"
          value={formValues.difficulty}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="importance">Importance</label>
        <input
          type="text"
          name="importance"
          id="importance"
          value={formValues.importance}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={formValues.tags}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          value={formValues.due_date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="finished_on">Finished On</label>
        <input
          type="datetime-local"
          name="finished_on"
          id="finished_on"
          value={formValues.finished_on}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Update Goal</button>
    </form>
  );
};

export default EditGoalForm;
