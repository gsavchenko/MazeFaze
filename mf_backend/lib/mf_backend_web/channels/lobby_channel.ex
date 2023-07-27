defmodule MfBackend.LobbyChannel do
  use Phoenix.Channel

  def join("lobby:lobby", _params, socket) do
    Phoenix.PubSub.subscribe(MfBackend.PubSub, "lobbies")

    # Fetch all existing lobbies from the database
    lobbies = MfBackend.LobbyContext.list_lobbies()

    # Send all existing lobbies to the client
    send(self(), {:initial_lobbies, lobbies})

    {:ok, socket}
  end

  def handle_info({:initial_lobbies, lobbies}, socket) do
    push(socket, "initial_lobbies", %{lobbies: lobbies})
    {:noreply, socket}
  end
end
