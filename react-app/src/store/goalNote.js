// define the action type
const LOAD_NOTE = 'LOAD_NOTE';
const CREATE_NOTE = 'CREATE_NOTE';
const EDIT_NOTE = 'EDIT_NOTE';
// const DELETE_NOTE = 'DELETE_NOTE';

// define the action creators


const actionLoadNote = (note) => {
    return {
        type: LOAD_NOTE,
        note: note
    };
};

const actionCreateNote = (note) => {
    return {
        type: CREATE_NOTE,
        note: note
    };
};

const actionEditNote = (note) => {
    return {
        type: EDIT_NOTE,
        note: note
    };
};

// const actionDeleteNote = (noteId) => {
//     return {
//         type: DELETE_NOTE,
//         noteId: noteId
//     };
// };



  export const thunkFetchNoteByGoalId = (goalId) => async (dispatch) => {
    const res = await fetch(`/api/goal_notes/${goalId}`);

    if(res?.ok){
        const data = await res.json();
        dispatch(actionLoadNote(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }
  };

  export const thunkCreateGoalNote = (noteData) => async (dispatch) => {

    const {goalId, noteBody} = noteData
    const goal_id = goalId
    const note_body = noteBody

    const res = await fetch('/api/goal_notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({goal_id, note_body} ),
    });
    console.log(res, "RES")
    if(res?.ok){
        const data = await res.json();

        dispatch(actionCreateNote(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };

  export const thunkEditGoalNote = (noteData) => async (dispatch) => {
    const {goalId, noteBody} = noteData
    console.log(goalId, noteBody,"THUNK")
    const goal_id = goalId
    const note_body = noteBody

    const res = await fetch(`/api/goal_notes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({goal_id, note_body}),
    });

    if(res?.ok){
        const data = await res.json();
        console.log(data, "DATA THUNK")
        dispatch(actionEditNote(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };

  // export const thunkDeleteNote = (goalId) => async (dispatch) => {
  //   const res = await fetch(`/api/goalnotes/${goalId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if(res?.ok){
  //       const data = await res.json();
  //       dispatch(actionDeleteNote(id));
  //       return data
  //   }else if (res?.status <500){
  //       const data = await res.json()
  //       if (data.errors){

  //           return data
  //       }

  //   }

  // };


// define the initial state
const initialState = {
  notes: []
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTE:
      return {
        ...state,
        notes: [...action.note]
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note]
      };
    case EDIT_NOTE:
      const updatedNotes = state.notes.map(note => {
        if (note.id === action.note.id) {
          return action.note;
        } else {
          return note;
        }
      });
      return {
        ...state,
        notes: updatedNotes
      };
    // case DELETE_NOTE:
    //   const filteredNotes = state.notes.filter(note => note.id !== action.noteId);
    //   return {
    //     ...state,
    //     notes: filteredNotes
    //   };
    default:
      return state;
  }
};

export default notesReducer;
