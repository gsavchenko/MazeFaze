#!/bin/bash

echo "Setup machine for Elixir development"
echo "Install PostgreSQL"

brew install postgresql

echo "Install Erlang and Elixir"

brew install elixir
brew install erlang

cd mf_backend

# install hex package manager
mix local.hex

# phoenix app generator
mix archive.install hex phx_new

# create dev database
mix deps.get

# create user for databse
createuser -s postgres

mix ecto.create
