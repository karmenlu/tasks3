import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';

function TaskCreateForm(props) {
    let {users, add_task_forms, dispatch} = props;
    let form = add_task_forms;

    function create_task(ev) {
        api.create_task(form.title, form.description, form.doer_id);
        return false;
    }

    function edit_name(ev) {
        let action = {
            type: "UPDATE_ADD_TASK_FORM",
            title: ev.target.value
        };
        dispatch(action);
    }

    function edit_description(ev) {
        let action = {
            type: "UPDATE_ADD_TASK_FORM",
            description: ev.target.value
        };
        dispatch(action);
    }

    function edit_doer_id(ev) {
        let action = {
            type: "UPDATE_ADD_TASK_FORM",
            doer_id: ev.target.value
        };
        dispatch(action);
    }

    return <div>
            <form action="javascript:void(0)" onSubmit={create_task}>
                <div className="form-group">
                    <label htmlFor="taskFormTitleInput">Task Title</label>
                    <input type="text" className="form-control" id="taskFormTitleInput"
                        onChange={edit_name} value={form.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="taskFormDescInput">Description</label>
                    <input type="text" className="form-control" id="taskFormDescInput"
                        onChange={edit_description} value={form.description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="taskFormDoerInput">Doer</label>
                    <select className="form-control" id="taskFormDoerInput"
                        onChange={edit_doer_id} value={form.doer_id}>
                        <option value="0">No one</option>
                        { _.map(users, (user, i) =>
                            <option key={i} value={user.id}>{user.name}</option>
                        )}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Create Task</button>
            </form>
        </div>;
}


function state2props(state) {
    console.log("rerender", state);
    return {
        users: state.users,
        add_task_forms: state.add_task_forms
    };
}

export default connect(state2props)(TaskCreateForm);
