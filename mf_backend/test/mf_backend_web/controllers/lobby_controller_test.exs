defmodule MfBackendWeb.LobbyControllerTest do
  use MfBackendWeb.ConnCase, async: true
  alias MfBackend.LobbyContext

  require Logger

  @valid_attrs %{name: "my cool lobby", status: "open"}
  @invalid_attrs %{name: nil, status: nil}

  describe "index" do
    test "returns 200 and list of lobbies", %{conn: conn} do
      # Insert a couple of lobbies for the purpose of the test
      {:ok, lobby1} = LobbyContext.create_lobby(%{"name" => "lobby1", "status" => "open"})
      {:ok, lobby2} = LobbyContext.create_lobby(%{"name" => "lobby2", "status" => "closed"})

      # Make the request
      conn = get(conn, "/api/lobbies")

      # Check the response
      assert conn.status == 200
      assert Jason.decode!(conn.resp_body) == [
        %{ "id" => lobby1.id, "name" => "lobby1", "status" => "open"},
        %{ "id" => lobby2.id, "name" => "lobby2", "status" => "closed"},
      ]
    end
  end

  describe "create lobby" do
    test "returns 201 and lobby when data is valid", %{conn: conn} do
      conn = post(conn, "/api/lobbies", lobby: @valid_attrs)

      # for some reason the id is incrementing on every test run
      # it would be nice to figure out how to reset the db between tests
      assert conn.status == 201
      response_body = Jason.decode!(conn.resp_body)
      assert response_body["name"] == "my cool lobby"
      assert response_body["status"] == "open"
    end

    test "returns 422 when data is invalid", %{conn: conn} do
      conn = post(conn, "/api/lobbies", lobby: @invalid_attrs)

      assert %{status: 422} = conn
    end
  end
end
