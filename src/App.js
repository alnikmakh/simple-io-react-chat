import React from "react";
import { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

class App extends Component {
  constructor() {
    super();
    this.state = { msg: "" };
  }
  // I dont use .bind for functions below because i use "arrow functions"
  // Function for getting text input
  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  // Function for sending message to chat server
  onMessageSubmit = () => {
    socket.emit("chat message", this.state.msg);
    this.setState({ msg: "" });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
        <button onClick={this.onMessageSubmit}>Send</button>
      </div>
    );
  }
}

export default App;
