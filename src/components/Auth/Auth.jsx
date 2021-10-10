import "./Auth.sass";

import React from "react";
import PropTypes from "prop-types";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.getLoginOptions = this.getLoginOptions.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  getLoginOptions() {
    return this.props.reds
      .map((name) => {
        return { name, key: name.toLowerCase() };
      })
      .sort((a, b) => (a.key > b.key ? 1 : -1))
      .map((k) => <option key={k.name.toLowerCase()} value={k.name} />);
  }
  onLogin(event) {
    if (event.code === "Enter") {
      this.props.auth.setAuth(event.target.value);
    }
  }

  render() {
    return !this.props.auth.isLoggedIn ? (
      <div id="Auth">
        <label htmlFor="AuthInput">Вход:</label>
        <input id="AuthInput" type="text" list="AuthList" onKeyDown={this.onLogin} />
        <datalist id="AuthList">{this.getLoginOptions()}</datalist>
      </div>
    ) : (
      <div id="AuthUserName">{this.props.auth.nickname}</div>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    nickname: PropTypes.string,
    setAuth: PropTypes.func,
  }).isRequired,
  reds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Auth;
