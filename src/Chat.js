import React from "react";
function Chat(props) {
  
  if (props.state.nick) {
    return (
      <div className = "chat">
        <input className = "input-message" onChange={e => props.onTextChange(e)} value={props.state.msg} />
        <button className = "send-button button" onClick={props.onMessageSubmit}>Send</button>
        <div className = "messages-list">{props.renderChat()}</div>
        <div className = "online-list">{props.renderOnline()}</div>
      </div>
    )
  } else {
    return null;
  }
}
export default Chat;
