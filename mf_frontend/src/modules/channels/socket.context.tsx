import { createContext, useEffect, useState } from "react";
import { Socket } from "phoenix";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
}

// Create the context
const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = new Socket("/socket", { params: { userToken: "1234" } });

    socket.connect();

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
