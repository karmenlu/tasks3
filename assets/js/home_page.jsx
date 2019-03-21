import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';
import TaskList from './task_list.jsx';

function HomePage(props) {
    let {session, dispatch} = props;
    if (session == null) {
        return <div className="jumbotron">
            <h2 className="display-4">Welcome to Tasks3</h2>
              <p className="lead">Log in or register to get started.</p>
            </div>;
    } else {
        return <TaskList />;
    }
}

function state2props(state) {
    console.log("rerender", state);
    return {
        session: state.session
    };
}

export default connect(state2props)(HomePage);
