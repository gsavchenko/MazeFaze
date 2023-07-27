"use client";

import { useQuery } from "@tanstack/react-query";
import styles from "./page.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Lobby {
  id: number;
  name: string;
  status: string;
  // add any other fields you expect a lobby object to have
}

const fetchLobbies = async (): Promise<Lobby[]> => {
  const res = await fetch("http://localhost:4000/api/lobbies");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const queryClient = new QueryClient();

export default function Home() {
  const { data, status } = useQuery<Lobby[], Error>(["lobbies"], fetchLobbies);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <h1 className={styles.title}>Maze Faze</h1>
        <div>
          {status === "loading" ? (
            "Loading data..."
          ) : status === "error" ? (
            "Error fetching data"
          ) : (
            <>
              {/* render your data here */}
              {data?.map((lobby) => (
                <div key={lobby.id}>
                  <p>{lobby.name}</p>
                  <p>{lobby.status}</p>
                </div>
              ))}
            </>
          )}
        </div>
        <p className={styles.description}>
          Welcome to Maze Faze! Select a Lobby or create a new one to begin.
        </p>
      </main>
    </QueryClientProvider>
  );
}
