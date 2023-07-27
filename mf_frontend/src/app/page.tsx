"use client";

import styles from "./page.module.css";

import { Socket } from "phoenix";

export default function Home() {
  let socket = new Socket("ws://localhost:4000/player/websocket?vsn=2.0.0");
  socket.connect();
  let channel = socket.channel("lobby:lobby", {});
  channel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });

  channel.on("initial_lobbies", (payload) => {
    console.log("initial lobbies", payload);
  });

  return (
    <main className={styles.main}>
      <h1>Welcome to MazeFaze!</h1>
    </main>
  );
}
