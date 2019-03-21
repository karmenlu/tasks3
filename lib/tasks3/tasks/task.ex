defmodule Tasks3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completeHuh, :boolean, default: false
    field :description, :string
    field :timeSpent, :integer, default: 0
    field :title, :string
    belongs_to :doer, Tasks3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completeHuh, :timeSpent, :doer_id])
    |> validate_required([:title, :description, :completeHuh, :timeSpent])
  end
end
