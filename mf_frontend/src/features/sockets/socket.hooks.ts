import { useEffect } from "react";
import { Socket } from "phoenix";

export const usePhoenixSocket = () => {
  useEffect(() => {
    // Initialize the socket
    let socket = new Socket("ws://localhost:4000/socket", {
      params: { token: "some_token" },
    });
    socket.connect();

    // Join the channel
    let channel = socket.channel("room:lobby", {});
    channel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    // Listen for incoming messages
    channel.on("ping", (payload) => {
      console.log("Received ping", payload);
    });

    // Clean up the socket and channel when the component unmounts
    return () => {
      channel.leave();
      socket.disconnect();
    };
  }, []);

  // You could return some functions to send messages, etc., from here
};
