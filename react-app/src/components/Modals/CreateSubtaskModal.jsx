import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateTask } from "../../store/task";


const CreateSubtaskModal = ({parentTask, goalId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const [errors, setErrors] = useState([]);
  let moment = require('moment-timezone');

//  const getPrimalParentTask = (parentTask) => {
//     if (parentTask?.parent_task_id){
//       return getPrimalParentTask(parentTask?.parent_task_id)
//     }
//     return parentTask
//  }

let userTimezone = moment.tz.guess();
let localTime = moment.tz(userTimezone);
let minTime = localTime.add(10,"minutes").format('YYYY-MM-DDTHH:mm')



  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    difficulty: "Medium",
    priority: "Soon",
    tags: "",
    due_date: "",
    parent_task_id: parentTask?.id

  });
  const formattedDate = moment(formValues?.due_date)?.tz(moment.tz.guess())?.format("YYYY-MM-DDTHH:mm");
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let parentDate = moment.tz(parentTask?.due_date,  moment.tz.guess()).toDate().getTime()
    let thisDate = new Date(formValues?.due_date).getTime()

    if (thisDate >= parentDate){
      setErrors(["Subtask due date cannot be later than the due date of the parent task."])

      return
    }
    let localDate = formValues?.due_date
    let utcDate = moment.tz(localDate, userTimezone)
    .utc().format('YYYY-MM-DDTHH:mm')
    const data = await dispatch(thunkCreateTask({ ...formValues, due_date: utcDate }, goalId))
    .then((data)=>{

      if (data?.errors) {
        setErrors(data?.errors);
      } else {
        
        history.push(`/tasks/${data?.id}`)
        closeModal();
      }
    })
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
        <label htmlFor="importance">Priority *</label>
        <select id="importance" name="importance" value={formValues.importance}
        onChange={handleInputChange} required>
          <option value="Urgent">Urgent</option>
          <option value="Soon">Soon</option>
          <option value="Trivial">Trivial</option>
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
        <label htmlFor="due_date">Due Date *</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          min={minTime}
          value={formattedDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit">Create Task</button>
    </form>
    </div>
  );
};

export default CreateSubtaskModal;
