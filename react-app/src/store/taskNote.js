// define the action type
const LOAD_NOTE = 'LOAD_NOTE';
const CREATE_NOTE = 'CREATE_NOTE';
const EDIT_NOTE = 'EDIT_NOTE';


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




  export const thunkFetchNoteByTaskId = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/tasknotes/${taskId}`);

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

  export const thunkCreateTaskNote = (noteData) => async (dispatch) => {

    const {taskId, noteBody, noteState} = noteData
    const task_id = taskId
    const note_body = noteBody
    const note_state = noteState

    const res = await fetch('/api/tasknotes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_id, note_body, note_state} ),
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

  export const thunkEditTaskNote = (noteData) => async (dispatch) => {
    const {taskId, noteBody, noteStyle} = noteData
    console.log(taskId, noteBody,"THUNK")
    const task_id = taskId
    const note_body = noteBody
    const note_style = noteStyle

    const res = await fetch(`/api/tasknotes/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_id, note_body, note_style}),
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




// define the initial state
const initialState = {
  note: {},
};

const taskNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTE:
      return {
        note: {...action.note}
      };
    case CREATE_NOTE:
      return {
        note: { ...action.note}
      };
    case EDIT_NOTE:
      return {
        note: {...action.note}
      };

    default:
      return state;
  }
};

export default taskNotesReducer;
