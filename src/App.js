import React from "react";
import { Component } from "react";
import io from "socket.io-client";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import Video from "./Video";

const socket = io.connect("https://server-io-chat.herokuapp.com/");
//const socket = io.connect("http://localhost:5000");
let nick;

class App extends Component {
  constructor() {
    super();
    this.state = { nick: "", msg: "", chat: [], users: [] };
  }
  // I dont use .bind for functions below because i use "arrow functions"
  componentDidMount() {
    socket.on("chat message", (msg) => {
      let nowDateObj = new Date();
      let nowDate = nowDateObj.getHours() + ":" + nowDateObj.getMinutes() + ":" + nowDateObj.getSeconds();
      msg.date = nowDate;
      this.setState({
        chat: [...this.state.chat, msg]
      });  
    });
    socket.on("update", (users) => {
      this.setState({
        users: users
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
    const response = {
      id : window.location.pathname.slice(1),
      nick: nick
    };
    this.setState({ nick: nick });
    socket.emit("login", response);
  };
  
  onSubmitLogin = () => {
    const response = {
      id : socket.id,
      nick: nick
    };
   this.setState({ nick: nick });
   socket.emit("login", response);
 };
  // Function for sending message to chat server
  onMessageSubmit = () => {
    const response = {
      msg: this.state.msg,
      nick: nick,
      id: window.location.pathname.slice(1),
    };
    socket.emit("chat message", response);
    this.setState({ msg: "" });
  };
  
  onClickPlay = () => {
    
  };
  
  renderChat() {
    const { chat }  = this.state;
    //idx of each element of chat, need for generate key for each JSX tag
    return chat.map(({ nick, msg, date }, idx) => (
      <div key={idx}>
        <span style={{ color: "green" }}>{nick}: </span>
        <span>{msg}</span>
        <span style={{ marginLeft: "30px" }}>{date}</span>
      </div>
    ));
  };
  
  renderOnline() {
    const { users }  = this.state;
    //idx of each element of chat, need for generate key for each JSX tag
    return users.map((nick, idx) => (
      <div key={idx}>
        <span style={{ color: "grey" }}>{nick} </span>      
      </div>
    ));
  };

  render() {
    return (
      <Router>
        <Route exact path="/" render = {(props) => {
          if (!this.state.nick) {
            return <Login onNickChange = {this.onNickChange} onNickSubmit = {this.onSubmitLogin}/>;
          } else {
            return <Redirect to={`/${socket.id}`} />;
          }
         }} />
        
        <Route path="/:id" render = {(props) => {
          if (!this.state.nick) {
            return <Login onNickChange = {this.onNickChange} onNickSubmit = {this.onNickSubmit}/>;
          }
          return <div>
          <Chat onTextChange = {this.onTextChange} onMessageSubmit = {this.onMessageSubmit} state = {this.state} renderChat = {this.renderChat} users = {this.state.users} renderOnline = {this.renderOnline}/>;
         <Video onClickPlay = {this.onClickPlay} stream = {this.state.stream} state = {this.state}/>
         </div>
         }  
        } />
      </Router>
    );
  };
};

export default App;
