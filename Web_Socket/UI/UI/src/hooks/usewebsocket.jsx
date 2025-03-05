import { useState, useEffect } from "react";

const useWebSocket = (url, userName) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`${url}?name=${userName}`);

    ws.onopen = () => console.log("Connected to WebSocket server");
    
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    
    ws.onclose = () => console.log("Disconnected from WebSocket server");

    setSocket(ws);

    return () => ws.close();
  }, [url, userName]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
