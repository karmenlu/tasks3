import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';
import { Provider } from 'react-redux';

import HomePage from "./home_page.jsx";
import TaskCreateForm from "./task_create_form.jsx";
import Header from "./header.jsx"
import api from "./api";

// Attribution to Nat Tuck husky_shop_spa on Github
export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} store={store} />
    </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        api.fetch_tasks();
        api.fetch_users();

        if (localStorage["tasks3_session"]) {
            props.store.dispatch({
                  type: 'NEW_SESSION',
                  data: JSON.parse(localStorage["tasks3_session"])
            });
        }
    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header />
                    <div className="row">
                        <div className="col-12">
                            <Route path="/" exact={true} render={() =>
                                <HomePage />
                            } />
                            <Route path="/create_task" exact={true} render={() =>
                                <TaskCreateForm />
                            } />
                        </div>
                    </div>
                </div>
            </Router>
        </div>;
    }
}
