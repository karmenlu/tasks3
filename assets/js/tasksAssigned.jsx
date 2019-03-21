import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import api from './api';

export default connect((state) => {return {cart: state.tasksAssigned};})((props) => {
  let { tasksAssigned } = props;

  let rows = _.map(tasksAssigned, (item) =>
    <tr key={item.id}>
      <td>{ item.title }</td>
      <td>{ item.description }</td>
      <td>
        <button onClick={() => api.delete_tasksAssigned_item(item.id)}
                className="btn btn-danger">
          Remove
        </button>
      </td>
    </tr>
  );

  return <div>
    <h2>TasksAssigned</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  </div>;
});
