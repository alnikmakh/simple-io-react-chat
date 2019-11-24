import React from "react";
import { Component } from "react";
import io from "socket.io-client";

//const socket = io.connect("https://server-io-chat.herokuapp.com/");
const socket = io.connect("http://localhost:5000");
let nick;

class App extends Component {
  constructor() {
    super();
    this.state = { nick: "", msg: "", chat: [] };
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
  
  onNickChange = e => {
    nick = e.target.value;
  };
  
  onNickSubmit = () => {
    this.setState({ nick: nick });
  };

  // Function for sending message to chat server
  onMessageSubmit = () => {
    const response = {
      msg: this.state.msg,
      nick: nick
    };
    socket.emit("chat message", response);
    this.setState({ msg: "" });
  };
  
  renderChat() {
    const { chat }  = this.state;
    //idx of each element of chat, need for generate key for each JSX tag
    return chat.map(({ nick, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{nick}: </span>
        <span>{msg}</span>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <span>{this.state.nick ? this.state.nick : "Enter your nickname"}</span>
        {this.state.nick ? null : <input onChange={e => this.onNickChange(e)} />}
        {this.state.nick ? null : <button onClick={this.onNickSubmit}>Ok</button>}

        {this.state.nick ? <input onChange={e => this.onTextChange(e)} value={this.state.msg} /> : null }
        {this.state.nick ? <button onClick={this.onMessageSubmit}>Send</button> : null }
        {this.state.nick ? <div>{this.renderChat()}</div> : null }
      </div>
    );
  }
}

export default App;
