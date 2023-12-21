import { useEffect, useState } from "react";
import { Channel, Socket } from "phoenix";

export const usePhoenixChannel = (channelTopic: string) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<{ status: string }[]>([]);

  useEffect(() => {
    // Initialize the socket
    let socket = new Socket("ws://localhost:4000/socket", {
      params: { token: "some_token" },
    });
    socket.connect();

    // Join the channel
    // room:lobby
    let channel = socket.channel(channelTopic, {});
    channel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    setChannel(channel);

    // Listen for 'connection_ack' event
    channel.on("connection_ack", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket and channel when the component unmounts
    return () => {
      channel.leave();
      socket.disconnect();
    };
  }, [channelTopic]);

  const sendMessage = () => {
    if (channel) {
      channel.push("new_message", { body: "Hello world!" });
    }
  };

  return { messages, sendMessage };
};
