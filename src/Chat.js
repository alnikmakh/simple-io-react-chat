import React from "react";
function Chat(props) {
  if (props.state.nick) {
    return (
      <div>
        <input onChange={e => props.onTextChange(e)} value={props.state.msg} />
        <button onClick={props.onMessageSubmit}>Send</button>
        <div>{props.renderChat()}</div>
      </div>
    )
  } else {
    return null;
  }
}
export default Chat;