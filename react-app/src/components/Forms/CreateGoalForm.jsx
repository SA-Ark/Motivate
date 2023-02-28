import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateGoal } from '../../store/goal';


const CreateGoalForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal()
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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = await dispatch(thunkCreateGoal(formValues));
      if (data?.errors) {
        setErrors(data?.errors);
        history.push("/allgoals")
      } else {

        history.push(`/goals/${data.id}`)
        closeModal();
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
      <button type="submit">Create Goal</button>
    </form>
  );
};

export default CreateGoalForm;
