defmodule MfBackend.Repo do
  use Ecto.Repo,
    otp_app: :mf_backend,
    adapter: Ecto.Adapters.Postgres
end
