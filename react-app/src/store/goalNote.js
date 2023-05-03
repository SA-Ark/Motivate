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




  export const thunkFetchNoteByGoalId = (goalId) => async (dispatch) => {
    const res = await fetch(`/api/goalnotes/${goalId}`);

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

    const {goalId, noteBody, noteState} = noteData
    const goal_id = goalId
    const note_body = noteBody
    const note_state = noteState

    const res = await fetch('/api/goalnotes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({goal_id, note_body, note_state} ),
    });

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
    const {goalId, noteBody, noteStyle} = noteData

    const goal_id = goalId
    const note_body = noteBody
    const note_style = noteStyle

    const res = await fetch(`/api/goalnotes/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({goal_id, note_body, note_style}),
    });

    if(res?.ok){
        const data = await res.json();
      
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

const goalNotesReducer = (state = initialState, action) => {
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

export default goalNotesReducer;
