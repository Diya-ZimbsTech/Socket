import React, { useState } from "react";
import useWebSocket from "../hooks/usewebsocket";

const Chat = ({ userName }) => {
  const { messages, sendMessage } = useWebSocket("ws://localhost:6969/ws", userName);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>WebSocket Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <p key={index} style={styles.message}>{msg}</p>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial" },
  chatBox: { border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto", marginBottom: "10px" },
  message: { textAlign: "left", margin: "5px 0" },
  inputContainer: { display: "flex", justifyContent: "center", gap: "10px" },
  input: { padding: "8px", width: "60%", fontSize: "16px" },
  button: { padding: "8px 15px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" },
};

export default Chat;
