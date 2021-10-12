import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loadingPage: false,
      searchPage: false,
    };
  }

  handlerInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handlerButton = async () => {
    this.setState({
      loadingPage: true,
    });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    this.setState({
      searchPage: true,
    });
  }

  render() {
    const { loginName, loadingPage, searchPage } = this.state;
    const n = 3;
    if (searchPage) return <Redirect to="/search" />;
    if (loadingPage) return <Loading />;

    return (
      <div data-testid="page-login">
        Login
        <label htmlFor="name">
          <input
            value={ loginName }
            onChange={ this.handlerInput }
            type="text"
            name="loginName"
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handlerButton }
          disabled={ loginName.length < n }
        >
          Entrar
        </button>
      </div>
    );
  }
}
