import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*{
    Session
      session: null OR {token, user_id}

    DB Cache
      tasks: props.tasks // List of Task
      users: [] // List of User
      tasksAssigned // List of tasks assigned to a user

    Forms
      login_form: {email: "", password: ""},
      add_task_form: new Map(), // { product_id -> count }
    }
*/

function tasks(state = [], action) {
    switch (action.type) {
        case 'TASK_LIST':
            return action.data;
        case 'TASK_TEMP_UPDATE_TIMESPENT':
            let task_id = action.task_id;
            let timeSpent = action.timeSpent;
            let state1 = _.map(state, (tt, ii) => {
                if (tt.id == task_id) {
                    let task = _.clone(tt);
                    task.timeSpent = timeSpent;
                    return task;
                } else {
                    return tt;
                }
            });
            return state1;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
        return state;
    }
}

function tasksAssigned(state = [], action) {
    switch (action.type) {
        case 'TASKSASSIGNED_LIST':
            return action.data;
        case 'TASKSASSIGNED_DELETE':
            return _.filter(state, (item) => item.id != action.tasksAssigned_item_id);
        default:
            return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
        case 'NEW_SESSION':
            return action.data;
        case 'DESTROY_SESSION':
            return null;
        default:
            return state;
    }
}

let login_form0 = {name: "", password: "", message: null};
function login_form(state = login_form0, action) {
    switch(action.type) {
        case 'UPDATE_LOGIN':
            let state1 = _.clone(state);
            if (action["name"]) {
                state1["name"] = action["name"];
            }
            if (action["password"]) {
                state1["password"] = action["password"];
            }
            return state1;
        case 'LOGIN_ERROR':
            state1 = _.clone(state);
            state1.message = "Wrong username or password";
            return state1;
        case 'REGISTERED':
            state1 = _.clone(state);
            state1.message = "Register success. Now log in";
            return state1;
        default:
            return state;
    }
}

let add_task0 = {"title": "", "description": "", "doer_id": "0"};
function add_task_forms(state = add_task0, action) {
    switch (action.type) {
        case 'UPDATE_ADD_TASK_FORM':
            let state1 = _.clone(state);
            if (action["title"]) state1["title"] = action["title"];
            if (action["description"]) state1["description"] =  action["description"];
            if (action["doer_id"]) state1["doer_id"] =  action["doer_id"];
            return state1;
        case 'FINISH_ADD_TASK_FORM':
            return add_task0;
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    let reducer = combineReducers({tasks, users, tasksAssigned, session,
        login_form, add_task_forms});
    let state1 = reducer(state0, action);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;

