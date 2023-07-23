defmodule MfBackend.LobbyContext.Lobby do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :status]}
  schema "lobbies" do
    field :name, :string
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(lobby, attrs) do
    lobby
    |> cast(attrs, [:name, :status])
    |> validate_required([:name, :status])
  end
end
