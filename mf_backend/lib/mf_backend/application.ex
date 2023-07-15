defmodule MfBackend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      MfBackendWeb.Telemetry,
      # Start the Ecto repository
      MfBackend.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: MfBackend.PubSub},
      # Start Finch
      {Finch, name: MfBackend.Finch},
      # Start the Endpoint (http/https)
      MfBackendWeb.Endpoint
      # Start a worker by calling: MfBackend.Worker.start_link(arg)
      # {MfBackend.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: MfBackend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    MfBackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
