defmodule MfBackend.LobbyContextTest do
  use MfBackend.DataCase

  alias MfBackend.LobbyContext

  describe "lobbies" do
    alias MfBackend.LobbyContext.Lobby

    import MfBackend.LobbyContextFixtures

    @invalid_attrs %{name: nil, status: nil}

    test "list_lobbies/0 returns all lobbies" do
      lobby = lobby_fixture()
      assert LobbyContext.list_lobbies() == [lobby]
    end

    test "get_lobby!/1 returns the lobby with given id" do
      lobby = lobby_fixture()
      assert LobbyContext.get_lobby!(lobby.id) == lobby
    end

    test "create_lobby/1 with valid data creates a lobby" do
      valid_attrs = %{name: "some name", status: "some status"}

      assert {:ok, %Lobby{} = lobby} = LobbyContext.create_lobby(valid_attrs)
      assert lobby.name == "some name"
      assert lobby.status == "some status"
    end

    test "create_lobby/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = LobbyContext.create_lobby(@invalid_attrs)
    end

    test "update_lobby/2 with valid data updates the lobby" do
      lobby = lobby_fixture()
      update_attrs = %{name: "some updated name", status: "some updated status"}

      assert {:ok, %Lobby{} = lobby} = LobbyContext.update_lobby(lobby, update_attrs)
      assert lobby.name == "some updated name"
      assert lobby.status == "some updated status"
    end

    test "update_lobby/2 with invalid data returns error changeset" do
      lobby = lobby_fixture()
      assert {:error, %Ecto.Changeset{}} = LobbyContext.update_lobby(lobby, @invalid_attrs)
      assert lobby == LobbyContext.get_lobby!(lobby.id)
    end

    test "delete_lobby/1 deletes the lobby" do
      lobby = lobby_fixture()
      assert {:ok, %Lobby{}} = LobbyContext.delete_lobby(lobby)
      assert_raise Ecto.NoResultsError, fn -> LobbyContext.get_lobby!(lobby.id) end
    end

    test "change_lobby/1 returns a lobby changeset" do
      lobby = lobby_fixture()
      assert %Ecto.Changeset{} = LobbyContext.change_lobby(lobby)
    end
  end
end
