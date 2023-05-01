import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateGoal } from '../../store/goal';
import moment from "moment-timezone";

const CreateChildGoalModal = ({parentGoalId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const [errors, setErrors] = useState([]);
  let userTimezone = moment.tz.guess();
  let localTime = moment.tz(userTimezone);
let minTime = localTime.add(10,"minutes").format('YYYY-MM-DDTHH:mm')

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    difficulty: "Medium",
    importance: "Important",
    tags: "",
    due_date: "",
    parent_goal_id: parentGoalId

  });

   const formattedDate = moment(formValues?.due_date)?.tz(moment.tz.guess())?.format("YYYY-MM-DDTHH:mm");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let localDate = formValues?.due_date
    let utcDate = moment.tz(localDate, userTimezone)
    .utc().format('YYYY-MM-DDTHH:mm')

    const data = await dispatch(thunkCreateGoal({ ...formValues, due_date: utcDate }));
    if (data?.errors) {
      setErrors(data?.errors);
      history.push("/allgoals")
    } else {
      console.log(data, "Data")
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
          placeholder="Max 10 tags"
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
          min={minTime}
          value={formValues.due_date}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Create Goal</button>
    </form>
  );
};

export default CreateChildGoalModal;
