#!/bin/bash

echo "Setup machine for Elixir development"
echo "Install PostgreSQL"

# install postgresql
sudo apt-get install postgresql postgresql-contrib

# Installing PostGIS, procedural languages, client interfaces, etc
apt-cache search postgres

echo "Install Erlang and Elixir"

# install elixir
sudo apt-get install -y elixir 

# install erlang
sudo add-apt-repository ppa:rabbitmq/rabbitmq-erlang
sudo apt update -y
sudo apt install -y erlang

# install hex package manager
mix local.hex

# verify Elixir installation
echo "Verifying Elixir installation..."
elixir_version=$(elixir -v)
if [[ $elixir_version == *"Elixir"* ]]; then
  echo "Elixir installed successfully. Version: $elixir_version"
else
  echo "Elixir installation failed."
  exit 1
fi

# phoenix app generator
mix archive.install hex phx_new

# tools for hot reload on linux
sudo apt-get install -y inotify-tools

# create dev database
cd mf_backend
mix ecto.create
