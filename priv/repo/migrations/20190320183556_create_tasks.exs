defmodule Tasks3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :string
      add :completeHuh, :boolean, default: false, null: false
      add :timeSpent, :integer, default: 0, null: false
      add :doer_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:doer_id])
  end
end
