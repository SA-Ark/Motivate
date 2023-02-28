// define the action type
const LOAD_NOTE = 'LOAD_NOTE';
const CREATE_NOTE = 'CREATE_NOTE';
const EDIT_NOTE = 'EDIT_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';

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

const actionDeleteNote = (noteId) => {
    return {
        type: DELETE_NOTE,
        noteId: noteId
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

  export const thunkCreateNote = (noteData) => async (dispatch) => {

    const {goalId, noteBody} = noteData


    const res = await fetch('/api/goalnotes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({goalId, noteBody} ),
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

  export const thunkEditNote = (id, goalData) => async (dispatch) => {
    
    const res = await fetch(`/api/goalnotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
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

  export const thunkDeleteNote = (id) => async (dispatch) => {
    const res = await fetch(`/api/goalnotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionDeleteNote(id));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


// define the reducer
const initialState = {
    goals: {},
    singleGoal: null
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:

            return {
                ...state,
                goals: {...action.goals}
            };
        case LOAD_NOTE:
            return {
                ...state,
                singleGoal: action.goal
            };
        case CREATE_NOTE:

            return {
                ...state,
                goals: {...state?.goals, [action.goal?.id]:{...action.goal}},
                singleGoal: {...action.goal}
            };
        case EDIT_NOTE:

            delete state?.goals[action.goal?.id]
            return {
                ...state,
                goals: {...state?.goals, [action.goal?.id]:{...action.goal}},
                singleGoal: {...action.goal}
            };

        case DELETE_NOTE:
            const newGoals = { ...state };
            console.log(newGoals, "NEW GOALS")
            delete newGoals.goals[action.goalId];
            return {
                ...newGoals,
                singleGoal: null
            };
        default:
            return state;
    }
};


export { goalReducer, actionLoadGoals, actionLoadGoal, actionCreateGoal, actionEditGoal, actionDeleteGoal };
