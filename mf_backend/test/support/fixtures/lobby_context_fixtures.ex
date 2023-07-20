defmodule MfBackend.LobbyContextFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `MfBackend.LobbyContext` context.
  """

  @doc """
  Generate a lobby.
  """
  def lobby_fixture(attrs \\ %{}) do
    {:ok, lobby} =
      attrs
      |> Enum.into(%{
        name: "some name",
        status: "some status"
      })
      |> MfBackend.LobbyContext.create_lobby()

    lobby
  end
end
