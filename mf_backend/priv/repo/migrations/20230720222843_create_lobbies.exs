defmodule MfBackend.Repo.Migrations.CreateLobbies do
  use Ecto.Migration

  def change do
    create table(:lobbies) do
      add :name, :string
      add :status, :string

      timestamps()
    end
  end
end
