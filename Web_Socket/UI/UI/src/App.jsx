import React, { useState } from "react";
import Chat from "./components/chat";

const App = () => {
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div style={styles.container}>
      {!joined ? (
        <div>
          <h2>Enter your name to join the chat</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
          />
          <button
            onClick={() => setJoined(true)}
            disabled={!userName.trim()}
            style={styles.button}
          >
            Join
          </button>
        </div>
      ) : (
        <Chat userName={userName} />
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial" },
  input: { padding: "8px", width: "60%", fontSize: "16px", marginBottom: "10px" },
  button: { padding: "8px 15px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" },
};

export default App;
