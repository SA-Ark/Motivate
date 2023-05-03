// define the action types
const LOAD_TASKS = 'LOAD_TASKS';
const LOAD_SINGLE_TASK = 'LOAD_SINGLE_TASK';
const CREATE_TASK = 'CREATE_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';

// define the action creators
const actionLoadTasks= (tasks) => {
    return {
        type: LOAD_TASKS,
        tasks: tasks
    };
};

const actionLoadSingleTask = (task) => {
    return {
        type: LOAD_SINGLE_TASK,
        task: task
    };
};

const actionCreateTask = (task) => {
    return {
        type: CREATE_TASK,
        task: task
    };
};

const actionEditTask = (task) => {
    return {
        type: EDIT_TASK,
        task: task
    };
};

const actionDeleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId: taskId
    };
};

export const thunkFetchAllTasksByGoalId = (goalId) => async (dispatch) => {

    const res = await fetch(`/api/goals/tasks/${goalId}`);
    if(res?.ok){
        const data = await res.json();
        dispatch(actionLoadTasks(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };

  export const thunkFetchTaskById = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}`);

    if(res?.ok){
        const data = await res.json();
        dispatch(actionLoadSingleTask(data));
        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }
  };

  export const thunkCreateTask = (taskData, goalId) => async (dispatch) => {

    const {name, description, difficulty, priority,
    tags, due_date, parent_task_id} = taskData

    const res = await fetch(`/api/tasks/${goalId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description, difficulty, priority,
        tags, due_date, parent_task_id} ),
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionCreateTask(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }else {

            // Handle server errors (500 or greater)

            return {errors: ["An error occurred while creating the task. Please try again later."]};
          }

    }

  };



  export const thunkEditTask = (id, taskData) => async (dispatch) => {

    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionEditTask(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


  export const thunkCompleteTask = (id) => async (dispatch) => {

    const res = await fetch(`/api/tasks/complete/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: "none",
    });
    
    if(res?.ok){
        const data = await res.json();
        dispatch(actionEditTask(data));

        return data
    }else if (res?.status <500){
        const data = await res.json()
        if (data.errors){

            return data
        }

    }

  };


  export const thunkDeleteTask = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(res?.ok){
        const data = await res.json();
        dispatch(actionDeleteTask(id));
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
    tasks: {},
    singleTask: null
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TASKS:
            return {
                ...state,
                tasks: { ...state.tasks, ...action.tasks }
            };
        case LOAD_SINGLE_TASK:
            return {
                ...state,
                singleTask: action.task
            };
        case CREATE_TASK:
            return {
                ...state,
                tasks: { ...state?.tasks, [action.task?.id]: { ...action.task } },
                singleTask: { ...action.task }
            };
        case EDIT_TASK:
            delete state?.tasks[action.task?.id]
            return {
                ...state,
                tasks: { ...state?.tasks, [action.task?.id]: { ...action.task } },
                singleTask: { ...action.task }
            };
        case DELETE_TASK:
            const newTasks = { ...state };
            delete newTasks.tasks[action.taskId];
            return {
                ...newTasks,
                singleTask: null
            };
        default:
            return state;
    }
};

export { taskReducer };
