import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    textInput: '',
    controlButton: true,
    api: '',
    loading: false,
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { textInput } = this.state;
      const minCharacters = 2;
      if (textInput.length > minCharacters) {
        this.setState({
          controlButton: false,
        });
      } else {
        this.setState({
          controlButton: true,
        });
      }
    });
  }

  loading = async () => {
    const { textInput } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const fetch = await createUser({ name: textInput });
      this.setState({
        api: fetch,
      });
    } catch (error) {
      console.log(error);
    }
  }

  redirectLogin = () => {
    const { api } = this.state;
    if (api) return (<Redirect to="/search" />);
    return (<Loading />);
  }

  render() {
    const { textInput, controlButton, loading } = this.state;
    return (
      loading ? this.redirectLogin() : (
        <div data-testid="page-login" className="area-login">
          <div className="login">
            <img className="img-login" src="logo192.png" alt="logoreact" />
            <div className="form">
              <input
                type="text"
                value={ textInput }
                className="input-name-login"
                name="textInput"
                placeholder="Nome"
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
              <button
                type="button"
                data-testid="login-submit-button"
                className="login-submit-button"
                disabled={ controlButton }
                onClick={ this.loading }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Login;
