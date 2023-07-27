defmodule MfBackend.PlayerSocket do
  use Phoenix.Socket

  # TODO: think of a way to generate unique user ids
  def id(_conn), do: nil

  channel("lobby:lobby", MfBackend.LobbyChannel)

  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end
end
