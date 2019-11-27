import React from "react";

function Chat(props) {
  
  if (props.state.nick) {
    return (
      <div className = "chat">
        <span>Greetings, {props.state.nick}</span>
        <div className = "input-message-box">
          <input className = "input-message" onChange={e => props.onTextChange(e)} value={props.state.msg} />
          <button className = "send-button button" onClick={props.onMessageSubmit}>Send</button>
        </div>        
        <div className = "messages-list">{props.renderChat()}</div>
        <span className = "users-online">Users online:</span>
        <div className = "online-list">{props.renderOnline()}</div>
      </div>
    )
  } else {
    return null;
  }
};

export default Chat;
