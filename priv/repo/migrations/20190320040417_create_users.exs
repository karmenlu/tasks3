defmodule Tasks3.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :password_hash, :string, null: false
      add :pw_tries, :integer, default: 0, null: false
      add :pw_last_try, :utc_datetime

      timestamps()
    end

    create unique_index(:users, [:name])
  end
end
