import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditGoalNote, thunkFetchNoteByGoalId } from "../../store/goalNote";

const EditGoalNoteModal = ({goalId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [errors, setErrors] = useState([]);
    let note;
    useEffect(()=>{
      if(goalId){

        note = dispatch(thunkFetchNoteByGoalId(goalId))
      }
    }, [dispatch])
    const [noteBody, setNoteBody] = useState(note?.note_body || "")

    const handleInputChange = e =>{
        setNoteBody(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = {noteBody, goalId }
        console.log(noteData, "note data")
        const data = await dispatch(thunkEditGoalNote(noteData));
        if (data?.errors) {
          setErrors(data?.errors);
        } else {

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
            <label htmlFor="note body">Note Body</label>
            <input
              type="text"
              name="note body"
              id="note body"
              value={noteBody}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Goal Notes</button>
    </form>
  );
}

export default EditGoalNoteModal
