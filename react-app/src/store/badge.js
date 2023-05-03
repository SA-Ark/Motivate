// Actions
export const SET_BADGES = 'SET_BADGES';
export const SET_BADGE = 'SET_BADGE';
export const SET_PREV_GOALS = 'SET_PREV_GOALS';
export const SET_NEXT_GOAL = 'SET_NEXT_GOAL';

// Action Creators
export const actionSetBadges = (badges) => ({
  type: SET_BADGES,
  payload: badges,
});

export const actionSetBadge = (badge) => ({
  type: SET_BADGE,
  payload: badge,
});

export const actionSetPrevGoals = (goals) => ({
  type: SET_PREV_GOALS,
  payload: goals,
});

export const actionSetNextGoal = (goal) => ({
  type: SET_NEXT_GOAL,
  payload: goal,
});

// Thunks
export const thunkGetAllBadges = () => async (dispatch) => {
  const res = await fetch('/api/badges/');
  if (res.ok) {
    const badges = await res.json();
    dispatch(actionSetBadges(badges));
    
    return badges
  }else if (res?.status <500){
    const data = await res.json()
    if (data.errors){

      return data
  }
  }
};

export const thunkGetBadgeById = (badgeId) => async (dispatch) => {
  const res = await fetch(`/api/badges/${badgeId}`);
  if (res.ok) {
    const badge = await res.json();
    dispatch(actionSetBadge(badge));
    return badge
  }else if (res?.status <500){
    const data = await res.json()
    if (data.errors){

      return data
  }
  }
};

export const thunkGetPrevBadgeGoals = (badgeId) => async (dispatch) => {
  const res = await fetch(`/api/badges/${badgeId}/goals`);
  if (res.ok) {
    const goals = await res.json();
    dispatch(actionSetPrevGoals(goals));
    return goals
  }else if (res?.status <500){
    const data = await res.json()
    if (data.errors){

      return data
  }
  }
};

export const thunkGetNextBadgeGoal = (badgeId) => async (dispatch) => {
  const res = await fetch(`/api/badges/${badgeId}/nextgoal`);
  if (res.ok) {
    const goal = await res.json();
    dispatch(actionSetNextGoal(goal));
    return goal
  }else if (res?.status <500){
    const data = await res.json()
    if (data.errors){

      return data
  }
  }
};

// Reducer
const initialState = {
  badges: {},
  badge: {},
  prevGoals: {},
  nextGoal: {},
};

export default function badgesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BADGES:
      return { ...state, badges: {...action.payload} };
    case SET_BADGE:
      return { ...state, badge: action.payload };
    case SET_PREV_GOALS:
      return { ...state, prevGoals: {...action.payload} };
    case SET_NEXT_GOAL:
      return { ...state, nextGoal: action.payload };
    default:
      return state;
  }
}
