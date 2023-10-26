#!/bin/bash

echo "Setup machine for Elixir development"
echo "Install PostgreSQL"

brew install postgresql@15

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
mix ecto.create
