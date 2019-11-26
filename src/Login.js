import React from "react";
class Login extends React.Component {
  render() {
    return <div className = "login"><span>Enter your nickname:</span>
      <input className = "login-input" onChange={e => this.props.onNickChange(e)} />
      <button className = "login-button button" onClick={() => this.props.onNickSubmit()}>Ok</button>
    </div>
  }
}
export default Login;
