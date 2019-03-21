defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    tasks = Tasks3.Tasks.list_tasks()
            |> Enum.map(fn task -> Tasks3Web.TaskView.render("task.json", %{task: task}) end)
    render(conn, "index.html", tasks: tasks)
  end
end
