import React from "react";
function Login(props) {
  return (
    <div>
      <input onChange={e => props.onNickChange(e)} />
      <button onClick={props.onNickSubmit}>Ok</button>
    </div>
  )
}
export default Login;