import React from "react";
import { Component } from "react";
import io from "socket.io-client";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
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
      <Router>
        <Route exact path="/" render = {(props) => {
          if (!this.state.nick) {
            return <Login onNickChange = {this.onNickChange} onNickSubmit = {this.onNickSubmit}/>;
          } else {
            return <Redirect to={`/${nick}`} />;
          }
         }  
        }/>
        
        <Route path="/:id" render = {(props) => 
          <Chat onTextChange = {this.onTextChange} onMessageSubmit = {this.onMessageSubmit} state = {this.state} renderChat = {this.renderChat}/>
        } />
      </Router>
    );
  };
};

export default App;
