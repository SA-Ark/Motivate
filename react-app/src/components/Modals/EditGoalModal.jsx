import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditGoal } from "../../store/goal";
import { useModal } from "../../context/Modal";
import moment from "moment-timezone";

const EditGoalModal = ({ id }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const goal = useSelector(state => state.goals?.singleGoal);
  const [errors, setErrors] = useState([]);
  const {closeModal} = useModal()
  let userTimezone = moment.tz.guess();
let localTime = moment.tz(userTimezone);
let minTime = localTime.add(10,"minutes").format('YYYY-MM-DDTHH:mm')

  const [formValues, setFormValues] = useState({

        name: goal?.name || "",
        description: goal?.description || "",
        difficulty: goal?.difficulty || "",
        importance: goal?.importance || "",
        // tags: goal?.tags || "",
        due_date: goal?.due_date ? goal.due_date: "",

  });
  console.log(goal, "GOAL")
  console.log(formValues, "duedate")



  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues,"fORM VALS")
  };
  const formattedDate = moment(formValues?.due_date)?.tz(moment.tz.guess())?.format("YYYY-MM-DDTHH:mm");
  const handleSubmit = async (event) => {
    event.preventDefault();
    let localDate = formValues?.due_date
    let utcDate = moment.tz(localDate, userTimezone)
    .utc().format('YYYY-MM-DDTHH:mm')
    const data = await dispatch(thunkEditGoal(id, { ...formValues, due_date: utcDate }));
    if (data?.errors) {
      setErrors(data?.errors);

    } else {

      closeModal()
    }
  };

  return (
    <div className="modal-fields">
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
          value={formattedDate}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Update Goal</button>
    </form>
    </div>
  );
};

export default EditGoalModal;
