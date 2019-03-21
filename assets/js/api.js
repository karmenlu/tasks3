import store from './store';

class TheServer {
    fetch_path(path, callback) {
        $.ajax(path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: callback,
        });
    }

    fetch_tasks() {
        this.fetch_path(
            "/api/v1/tasks",
            (resp) => {
                store.dispatch({
                    type: 'TASK_LIST',
                    data: resp.data,
                });
            }
        );
    }

    fetch_users() {
        this.fetch_path(
            "/api/v1/users",
            (resp) => {
                store.dispatch({
                    type: 'USER_LIST',
                    data: resp.data,
                });
            }
        );
    }

    fetch_tasksAssigned() {
        // Pass user_id to server
        this.fetch_path(
            "/api/v1/tasksAssigned",
            (resp) => {
                store.dispatch({
                    type: 'TASKSASSIGNED',
                    data: resp.data,
                });
            }
        );
    }


    send_post(path, data, callback, errorCallback=()=>{}) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
      error: errorCallback
    });
  }

  send_patch(path, data, callback) {
    $.ajax(path, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  register_user(name, password) {
      this.send_post("/api/v1/users",
          {"user": {name, password}},
          (resp) => {
            store.dispatch({
              type: 'REGISTERED',
            });
          })
  }

  create_session(name, password) {
    this.send_post(
      "/api/v1/auth",
      {name, password},
      (resp) => {
        localStorage["tasks3_session"] = JSON.stringify(resp.data);
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      },
      (resp) => {
        store.dispatch({
          type: 'LOGIN_ERROR',
        });
      }
    );
  }

  create_task(title, description, doer_id) {
    this.send_post(
        "/api/v1/tasks",
        {"task": {title, description, doer_id}},
        (resp) => {
            store.dispatch({
                type: 'FINISH_ADD_TASK_FORM',
            });
            api.fetch_tasks();
        }
    );
  }

  destroy_session() {
    delete localStorage["tasks3_session"];
    store.dispatch({
      type: 'DESTROY_SESSION'
    });
  }

  change_doer(task_id, doer_id) {
    this.send_patch(
      "/api/v1/tasks/" + task_id,
      {task: {doer_id}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }

  change_completeHuh(task_id, completeHuh) {
    this.send_patch(
      "/api/v1/tasks/" + task_id,
      {task: {completeHuh}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }


  change_timeSpent(task_id, timeSpent) {
    this.send_patch(
      "/api/v1/tasks/" + task_id,
      {task: {timeSpent}},
      (resp) => {
        this.fetch_tasks();
      },
    );
  }
}

export default new TheServer();
