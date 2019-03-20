defmodule Tasks3.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :password_hash, :string
      add :pw_tries, :integer
      add :pw_last_try, :utc_datetime
      add :tasksAssigned, references(:tasks, on_delete: :nothing)

      timestamps()
    end

    create index(:users, [:tasksAssigned])
  end
end
