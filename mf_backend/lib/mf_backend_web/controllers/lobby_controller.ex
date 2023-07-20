defmodule MfBackendWeb.LobbyController do
  use MfBackendWeb, :controller

  alias MfBackend.LobbyContext

  def index(conn, _params) do
    lobbies = LobbyContext.list_lobbies()
    json(conn, lobbies)
  end

  def create(conn, %{"lobby" => lobby_params}) do
    case LobbyContext.create_lobby(lobby_params) do
      {:ok, lobby} ->
        conn
        |> put_status(:created)
        |> json(lobby)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(changeset)
    end
  end
end
