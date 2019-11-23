import React from "react";
import { Component } from "react";
import io from "socket.io-client";

//const socket = io.connect("https://server-io-chat.herokuapp.com/");
const socket = io.connect("http://localhost:5000");

class App extends Component {
  constructor() {
    super();
    this.state = { msg: "", chat: [] };
  }
  // I dont use .bind for functions below because i use "arrow functions"
  componentDidMount() {
    socket.on("chat message", (msg) => {
      this.setState({
        chat: [...this.state.chat, msg]
      });
    });
  };
  
  // Function for getting text input
  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  // Function for sending message to chat server
  onMessageSubmit = () => {
    const { msg } = this.state;
    const id = socket.id;
    socket.emit("chat message", { id, msg });
    this.setState({ msg: "" });
  };
  
  renderChat() {
    const { chat }  = this.state;
    //idx of each element of chat, need for generate key for each JSX tag
    return chat.map(({ id, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{id}: </span>
        <span>{msg}</span>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
        <button onClick={this.onMessageSubmit}>Send</button>
        <div>{this.renderChat()}</div>
      </div>
    );
  }
}

export default App;
