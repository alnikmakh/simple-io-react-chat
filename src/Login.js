import React from "react";
class Login extends React.Component {
  render() {
    return <div>
      <input onChange={e => this.props.onNickChange(e)} />
      <button onClick={() => this.props.onNickSubmit()}>Ok</button>
    </div>
  }
}
export default Login;
