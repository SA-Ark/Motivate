import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateTask } from "../../store/task";


const CreateSubtaskModal = ({parentTaskId, goalId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const [errors, setErrors] = useState([]);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    difficulty: "Medium",
    priority: "Soon",
    tags: "",
    due_date: "",
    parent_task_id: parentTaskId

  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(thunkCreateTask(formValues, goalId));
    if (data?.errors) {
      setErrors(data?.errors);
    } else {

      history.push(`/tasks/${data.id}`)
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

      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateSubtaskModal;
