import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditGoalNote, thunkFetchNoteByGoalId } from "../../store/goalNote";
import { EditorState, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextEditor from "../TextEditor/textEditor";


const EditGoalNoteModal = ({ goalId }) => {


  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const stateNote = useSelector(state => state.goalNote?.note)
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


  // const editorStyle = {
  //   border: "1px solid #ccc",
  //   borderRadius: "5px",
  // };
  console.log(stateNote, "statenote")




  useEffect(() => {
    // if (goalId) {

    //   dispatch(thunkFetchNoteByGoalId(goalId))

    // }
    if (!noteBody && stateNote?.note_body && stateNote?.note_body !== "") {
      setButtonText("Update Note")
      // console.log("true", buttonText)
      // setNoteBody(stateNote?.note_body)
    //   const contentState = ContentState.createFromText(stateNote?.note_body);
    //   const newEditorState = EditorState.createWithContent(contentState);
    //   setEditorState(newEditorState)
     }
  }, [dispatch, goalId])



  // const handleInputChange = e => {
  //   setNoteBody(e.target.value)

  // }
  // const handleEditorChange = (newState) => {
  //   const escapedContent = JSON.stringify(convertToRaw(newState.getCurrentContent()));
  //   const newEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(escapedContent)));
  //   setEditorState(newEditorState);
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const noteData = { noteBody, goalId }
    const contentState = editorState.getCurrentContent();
  const plainText = contentState.getPlainText();
  const rawState = JSON.stringify(convertToRaw(contentState));
  setNoteBody(plainText);
  console.log(plainText, "plaintext")
  console.log(rawState, "raw")
    const noteData = {
      // noteBody: editorState.getCurrentContent().getPlainText(),
       noteBody: plainText,
       noteStyle: rawState,
      goalId,
    };
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
      <div className="note-body">
        <label htmlFor="note body">Note Body</label>
        {/* <textarea
              name="note body"
              id="note body"
              value={noteBody}
              onChange={handleInputChange}
            /> */}
        <TextEditor

          editorState={editorState}
          onEditorStateChange={setEditorState}
          noteState={stateNote?.note_style}
          // onEditorStateChange={handleEditorChange}
          // toolbar={{
          //   options: ["inline", "list", "link"],
          //   inline: {
          //     options: ["bold", "italic", "underline"],
          //   },
          // }}
          // editorStyle={editorStyle}
        />

      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default EditGoalNoteModal
