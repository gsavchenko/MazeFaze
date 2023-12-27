import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Socket } from "phoenix";
import { Models } from "@/modules/data-api/models";

export const useConnectionStatusSubscription =
  (): UseQueryResult<Models.ConnectionStatus> => {
    const queryClient = useQueryClient();
    const queryKey = ["connectionStatus"];

    useEffect(() => {
      const socket = new Socket("ws://localhost:4000/socket", {
        params: { token: "some_token" },
      });
      socket.connect();
      const channel = socket.channel("room:lobby", {});

      channel
        .join()
        .receive("ok", (resp) => console.log("Joined successfully", resp))
        .receive("error", (resp) => console.error("Unable to join", resp));

      channel.on("connection_ack", (status: Models.ConnectionStatus) => {
        queryClient.setQueryData(queryKey, status);
      });

      return () => {
        channel.leave();
        socket.disconnect();
      };
    }, [queryClient]);

    // Use useQuery to return the current state of the data
    return useQuery<Models.ConnectionStatus>({ queryKey });
  };
