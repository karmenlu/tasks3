import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';

function TaskList(props) {
    let {tasks, users, session, dispatch} = props;
    tasks = _.orderBy(tasks, (task) => task.id);
    let tas = _.map(tasks, (tt) =>
        <Task key={tt.id} dispatch={dispatch} 
            task={tt} users={users} session={session} doer={tt.doer_id}/>
    );
    return <div className="row">
        {tas}
    </div>;
}

function Task(props) {
    let {task, root, doer, users, session, dispatch} = props;

    function doer_changed(ev) {
        api.change_doer(task.id, ev.target.value);
    }

    function completeHuh_changed(ev) {
        api.change_completeHuh(task.id, ev.target.checked);
    }

    function timeSpent_changed(ev) {
        if (ev.target.checkValidity()) {
            api.change_timeSpent(task.id, ev.target.value);
        } else {
            let action = {
                type: 'TASK_TEMP_UPDATE_TIMESPENT',
                task_id: task.id,
                timeSpent: ev.target.value
            };
            dispatch(action);
        }
    }

    let am_doer_items = <div></div>;

    if (session != null && doer == session.user_id) {
        let error = [];
        if (task.timeSpent < 0) {
            error = <div class="alert alert-danger" role="alert">
                    Must be non negative
                </div>;
        } else if (task.timeSpent % 15 != 0) {
            error = <div class="alert alert-danger" role="alert">
                    Must be a multiple of 15
                </div>;
        }
        am_doer_items = <div>
            <div className="form-group">
                <label htmlFor={"timeSpent"+task.id}>Time Spent (min)</label>
                <input type="number" className="form-control" id={"timeSpent"+task.id}
                    value={task.timeSpent} min="0" step="15" onChange={timeSpent_changed} />
            </div>
            {error}
            <div className="form-group">
                <input className="form-check-input"
                    type="checkbox" id={"completeHuh" + task.id} checked={task.completeHuh}
                    onChange={completeHuh_changed} />
                <label htmlFor={"completeHuh" + task.id}>Complete</label>
            </div>
        </div>;
    }

    return <div className={"card col-4 " + (task.completeHuh ? "bg-success text-white" : "") }>
        <div className="card-body">
            <h2 className="card-title">{task.title}</h2>
            <div className="card-text">
                description: {task.description} <br />
                <p className="form-inline">
                    <select className="form-control" id="taskFormDoerInput"
                        onChange={doer_changed} value={doer||0}>
                        <option value="0">No one</option>
                        { _.map(users, (user, i) =>
                            <option key={i} value={user.id}>{user.name}</option>
                        )}
                    </select>
                </p>
                {am_doer_items}
            </div>
        </div>
    </div>;
}

function state2props(state) {
    return {
        doers: state.add_task_forms,
        tasks: state.tasks,
        users: state.users,
        session: state.session
    };
}

export default connect(state2props)(TaskList);
