// define the action types
const LOAD_GOALS = 'LOAD_GOALS';
const LOAD_SINGLE_GOAL = 'LOAD_SINGLE_GOAL';
const CREATE_GOAL = 'CREATE_GOAL';
const EDIT_GOAL = 'EDIT_GOAL';
const DELETE_GOAL = 'DELETE_GOAL';

// define the action creators
const actionLoadGoals = (goals) => {
    return {
        type: LOAD_GOALS,
        goals: goals
    };
};

const actionLoadSingleGoal = (goal) => {
    return {
        type: LOAD_SINGLE_GOAL,
        goal: goal
    };
};

const actionCreateGoal = (goal) => {
    return {
        type: CREATE_GOAL,
        goal: goal
    };
};

const actionEditGoal = (goal) => {
    return {
        type: EDIT_GOAL,
        goal: goal
    };
};

const actionDeleteGoal = (goalId) => {
    return {
        type: DELETE_GOAL,
        goalId: goalId
    };
};

export const thunkFetchAllGoals = () => async (dispatch) => {

    const res = await fetch('/api/goals/');
    if(res?.ok){
        const data = await res.json();
        dispatch(actionLoadGoals(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };

  export const thunkFetchGoalById = (id) => async (dispatch) => {
    const res = await fetch(`/api/goals/${id}`);

    if(res?.ok){
        const data = await res.json();
        dispatch(actionLoadSingleGoal(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }
  };

  export const thunkCreateGoal = (goalData) => async (dispatch) => {

    const {name, description, difficulty, importance,
    tags, due_date, parent_goal_id} = goalData

    console.log(goalData, "Thunk data")
    const res = await fetch('/api/goals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, difficulty, importance,
        tags, due_date, parent_goal_id} ),
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionCreateGoal(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };

  export const thunkCreateChildGoal = (goalData, parentGoalId) => async (dispatch) => {

    const {name, description, difficulty, importance,
    tags, due_date} = goalData


    const res = await fetch(`/api/goals/chaingoal/${parentGoalId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, difficulty, importance,
        tags, due_date} ),
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionCreateGoal(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


  export const thunkEditGoal = (id, goalData) => async (dispatch) => {
    console.log(id, goalData, "DATA IN THUNK")
    const res = await fetch(`/api/goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionEditGoal(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


  export const thunkCompleteGoal = (id) => async (dispatch) => {

    const res = await fetch(`/api/goals/complete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: "none",
    });
    console.log("HI")
    if(res?.ok){
        const data = await res.json();
        dispatch(actionEditGoal(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


  export const thunkDeleteGoal = (id) => async (dispatch) => {
    const res = await fetch(`/api/goals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionDeleteGoal(id));
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
        case LOAD_GOALS:

            return {
                ...state,
                goals: {...action.goals}
            };
        case LOAD_SINGLE_GOAL:
            return {
                ...state,
                singleGoal: action.goal
            };
        case CREATE_GOAL:

            return {
                ...state,
                goals: {...state?.goals, [action.goal?.id]:{...action.goal}},
                singleGoal: {...action.goal}
            };
        case EDIT_GOAL:

            delete state?.goals[action.goal?.id]
            return {
                ...state,
                goals: {...state?.goals, [action.goal?.id]:{...action.goal}},
                singleGoal: {...action.goal}
            };

        case DELETE_GOAL:
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


export { goalReducer, actionLoadGoals, actionLoadSingleGoal, actionCreateGoal, actionEditGoal, actionDeleteGoal };
