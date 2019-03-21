# Attribution to Nat Tuck husky_shop_spa
defmodule Tasks3Web.AuthController do
  use Tasks3Web, :controller

  alias Tasks3.Users
  alias Tasks3.Users.User

  action_fallback Tasks3Web.FallbackController

  def authenticate(conn, %{"name" => name, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(name, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(Tasks3Web.Endpoint, "user_id", user.id),
          user_id: user.id,
          user_name: user.name
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
