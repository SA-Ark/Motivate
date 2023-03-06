import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditGoal } from "../../store/goal";
import { useModal } from "../../context/Modal";
const EditGoalModal = ({ id }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const goal = useSelector(state => state.goals?.singleGoal);
  const [errors, setErrors] = useState([]);
  const {closeModal} = useModal()
  const [formValues, setFormValues] = useState({
    // name: "",
    // description: "",
    // difficulty: "",
    // importance: "",
    // tags: "",
    // due_date: "",
    name: goal?.name || "",
        description: goal?.description || "",
        difficulty: goal?.difficulty || "",
        importance: goal?.importance || "",
        // tags: goal?.tags || "",
        due_date: goal?.due_date ? new Date(goal.due_date).toISOString().slice(0, 16) : "",

  });
  console.log(goal, "GOAL")
  console.log(formValues, "duedate")

  // useEffect(() => {
  //   if (goal) {
  //     setFormValues({
  //       name: goal.name,
  //       description: goal.description,
  //       difficulty: goal.difficulty || "",
  //       importance: goal.importance || "",
  //       tags: goal.tags || "",
  //       due_date: goal.due_date || "",

  //     });
  //   }
  // }, [goal]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues,"fORM VALS")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(thunkEditGoal(id, formValues));
    if (data?.errors) {
      setErrors(data?.errors);

    } else {

      closeModal()
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div >
        <label htmlFor="name">Name *</label>
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
        <label htmlFor="description">Description *</label>
        <textarea
          name="description"
          id="description"
          value={formValues.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty *</label>
        <select id="difficulty" name="difficulty" value={formValues.difficulty}
        onChange={handleInputChange} required>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="importance">Importance *</label>
        <select id="importance" name="importance" value={formValues.importance}
        onChange={handleInputChange} required>
          <option value="Crucial">Crucial</option>
          <option value="Important">Important</option>
          <option value="Not Important">Not Important</option>
        </select>
      </div>
      {/* <div>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={formValues.tags}
          onChange={handleInputChange}
        />
      </div> */}
      <div>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          min={(new Date(Date.now() + 60000)).toISOString().slice(0, -8)}
          value={formValues.due_date}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Update Goal</button>
    </form>
  );
};

export default EditGoalModal;
