defmodule Tasks3Web.Router do
  use Tasks3Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Tasks3Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/create_task", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", Tasks3Web do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end
end
