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
    const data = await res.json();

    if(res?.ok){

        dispatch(actionLoadGoals(data));
    }else{

    }

  };

  export const thunkFetchGoalById = (id) => async (dispatch) => {
    const res = await fetch(`/api/goals/${id}/`);
    const data = await res.json();
    dispatch(actionLoadSingleGoal(data));
  };

  export const thunkCreateGoal = (goalData) => async (dispatch) => {
    console.log(goalData, "GOAL DATA")
    const {name, description, difficulty, importance,
    tags, due_date} = goalData


    const res = await fetch('/api/goals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, difficulty, importance,
        tags, due_date} ),
    });
    const data = await res.json();
    dispatch(actionCreateGoal(data));

  };

  export const thunkEditGoal = (goalData, id) => async (dispatch) => {
    const res = await fetch(`/api/goals/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });
    const data = await res.json();
    dispatch(actionEditGoal(data));

  };

  export const thunkDeleteGoal = (id) => async (dispatch) => {
    const res = await fetch(`/api/goals/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    dispatch(actionDeleteGoal(id));

  };


// define the reducer
const initialState = {
    goals: {},
    singleGoal: null
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GOALS:
            console.log({
                ...state,
                goals: {...action.goals}
            }, "GOALS")
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
            console.log(state, "state")
            console.log(action.goal, "goal")
            return {
                ...state,
                goals: [...state?.goals, action.goal],
                singleGoal: action.goal
            };
        case EDIT_GOAL:
            const updatedGoals = state?.goals?.goals.map(goal => {
                if (goal.id === action.goal.id) {
                    return action.goal;
                } else {
                    return goal;
                }
            });
            return {
                ...state,
                goals: updatedGoals,
                singleGoal: action.goal
            };

        case DELETE_GOAL:
            const newGoals = { ...state?.goals?.goals };
            delete newGoals[action.goalId];
            return {
                ...state,
                goals: newGoals,
                singleGoal: null
            };
        default:
            return state;
    }
};


export { goalReducer, actionLoadGoals, actionLoadSingleGoal, actionCreateGoal, actionEditGoal, actionDeleteGoal };
