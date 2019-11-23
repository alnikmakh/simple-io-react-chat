import React from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  return <div />;
}

export default App;
