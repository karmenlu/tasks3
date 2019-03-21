// attribution: Nat Tuck husky_shop_spa


import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from "./api";

function Header(props) {
  let {session, login_form, dispatch} = props;
  let session_info;

  function update_name(ev) {
      let action = {
          type: "UPDATE_LOGIN",
          name: ev.target.value
      };
      console.log(action);
      dispatch(action);
  }
  function update_password(ev) {
      let action = {
          type: "UPDATE_LOGIN",
          password: ev.target.value
      };
      dispatch(action);
  }

  function login(ev) {
    api.create_session(login_form.name, login_form.password);
  }

  function register(ev) {
    api.register_user(login_form.name, login_form.password);
  }

  function logout(ev) {
    api.destroy_session();
  }

  if (session == null) {
    let error = [];
      if (login_form.message) {
        error = <div key="1" className="alert alert-danger" role="alert">
            {login_form.message}
        </div>;
      }
    session_info = [<div key="0" className="form-inline input-group my-2">
      <input type="text" placeholder="name" className="form-control" value={login_form.name} onChange={update_name} />
      <input type="password" placeholder="password" className="form-control" value={login_form.password} onChange={update_password} />
      <button className="btn btn-secondary" onClick={login}>Login</button>
      <button className="btn btn-secondary" onClick={register}>Register</button>
      </div>,
    error];
  }
  else {
    session_info = <div className="my-2">
        <div className="alert alert-light" role="alert">
            Logged in as {session.user_name} &nbsp; | &nbsp; 
            <Link to={"/"}>Tasks</Link> &nbsp; | &nbsp;
            <Link to={"/create_task"}>Create Task</Link>
            <button style={{float: "right"}} className="btn btn-secondary" onClick={logout}>Log Out</button>
        </div>
    </div>
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>Tasks3</h1>
    </div>
    <div className="col-8">
      {session_info}
    </div>
  </div>;
}

function state2props(state) {
  return { session: state.session, login_form: state.login_form };
}

export default connect(state2props)(Header);
