import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateGoal } from '../../store/goal';
import moment from "moment-timezone";




const CreateGoalModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const [errors, setErrors] = useState([]);
  const [dueDate, setDueDate] = useState(null);
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

  });
  const formattedDate = moment(formValues?.due_date)?.tz(moment.tz.guess())?.format("YYYY-MM-DDTHH:mm");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isoDueDate = formValues.due_date ? formValues.due_date.toISOString().slice(0,-8) : '';
    let localDate = formValues?.due_date
    const dueDateString = formValues.due_date ? formValues.due_date.toLocaleString() : '';
    const minDueDateString = new Date(Date.now() + 60000).toLocaleString();
    const dueTime = new Date(dueDateString)?.getTime();
    const minDueTime = new Date(minDueDateString)?.getTime();

    if (localDate && dueTime < minDueTime) {
      setErrors(['Due date cannot be earlier than 1 minute from now.']);
      return;
    }

    let utcDate = moment.tz(localDate, userTimezone)
    .utc().format('YYYY-MM-DDTHH:mm')
    let vals;
    if (moment.utc(utcDate).isValid()){
      vals = { ...formValues, due_date: utcDate }
    }else{
      vals = { ...formValues, due_date: ""}
    }
   
    const data = await dispatch(thunkCreateGoal(vals));
    if (data?.errors) {
      setErrors(data?.errors);
      history.push("/allgoals")
    } else {

      history.push(`/goals/${data.id}`)
      closeModal();
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
          placeholder="Max 10 tags"
          value={formValues.tags}
          onChange={handleInputChange}
        />
      </div> */}
       <div className="date-picker-with-arrow" >
        <label htmlFor="due_date">Due Date</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          min={minTime}
          value={formattedDate}
          onChange={handleInputChange}

        />
{/* <DatePicker
     selected={dueDate}
     onChange={date => {
      setDueDate(date);
      setFormValues({ ...formValues, due_date: date });
    }}
     minDate={new Date(Date.now() + 60000)}
     showTimeSelect
     timeFormat="HH:mm"
     timeIntervals={15}
     dateFormat="MMMM d, yyyy h:mm aa"
     placeholderText="Select due date"

     name="due_date"
     id="due_date"
    /> */}
      </div>

      <button type="submit">Create Goal</button>
    </form>
    </div>
  );
};

export default CreateGoalModal;
