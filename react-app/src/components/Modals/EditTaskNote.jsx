import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkFetchNoteByTaskId, thunkEditTaskNote } from "../../store/taskNote";
import { EditorState, convertFromRaw, convertToRaw, ContentState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextEditor from "../TextEditor/textEditor";


const EditTaskNoteModal = ({ taskId }) => {


  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const stateNote = useSelector(state => state.taskNote?.note)
  const [errors, setErrors] = useState([]);
  const [noteBody, setNoteBody] = useState("")
  let [buttonText, setButtonText] = useState("Create Note")
  const [editorState, setEditorState] = useState(() => {
    if (stateNote?.note_body) {
      try {

          const contentState = ContentState.createFromText(stateNote.note_body);
          return EditorState.createWithContent(contentState);

      } catch (error) {
        console.error("Failed to create editor state from note body:", error);
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (stateNote?.note_style) { // check if note_style exists in stateNote
      try {
        const rawContent = JSON.parse(stateNote.note_style); // parse the raw state from stateNote
        const contentState = convertFromRaw(rawContent); // create content state from raw state
        const editorStateFromRaw = EditorState.createWithContent(contentState); // create editor state from content state
        setEditorState(editorStateFromRaw); // set the editor state
      } catch (error) {
        console.error("Failed to create editor state from note body:", error);
      }
    }
  }, [stateNote]);


  useEffect(() => {

    if (!noteBody && stateNote?.note_body && stateNote?.note_body !== "") {
      setButtonText("Update Note")

     }
  }, [dispatch, taskId])




  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
  const plainText = contentState.getPlainText();
  const rawState = JSON.stringify(convertToRaw(contentState));
  setNoteBody(plainText);
 
    const noteData = {
       noteBody: plainText,
       noteStyle: rawState,
      taskId,
    };
    const data = await dispatch(thunkEditTaskNote(noteData));

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
      <div className="note-body">
        <label htmlFor="note body">Note Body</label>

        <TextEditor

          editorState={editorState}
          onEditorStateChange={setEditorState}
          noteState={stateNote?.note_style}

        />

      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default EditTaskNoteModal
