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
        errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
          Enum.reduce(opts, msg, fn {key, value}, acc ->
            String.replace(acc, "%{#{key}}", to_string(value))
          end)
        end)
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{"errors" => errors})
        |> halt()
    end
  end
end
