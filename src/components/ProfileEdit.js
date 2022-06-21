import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    name: '',
    email: '',
    desc: '',
    image: '',
    button: true,
    redirect: false,
  }

  async componentDidMount() {
    const info = await getUser();
    this.setState({
      name: info.name,
      email: info.email,
      desc: info.description,
      image: info.image,
      loading: false,
    }, this.controlButton);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.controlButton);
  }

  controlButton = () => {
    const { name, email, desc, image } = this.state;
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (name && email && desc && image && email.match(mailFormat)) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  saveProfile = async () => {
    const { name, email, desc, image } = this.state;
    const user = { name, email, image, description: desc };
    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ loading: false, redirect: true });
  }

  editProfile = () => {
    const { name, email, desc, image, button, redirect } = this.state;
    return (
      redirect ? <Redirect to="/profile" /> : (
        <form className="form-edit">
          <label htmlFor="input-name">
            Name:
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              value={ name }
              data-testid="edit-input-name"
              id="input-name"
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              type="text"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="edit-input-email"
              id="input-email"
            />
          </label>
          <label htmlFor="input-description">
            Description:
            <input
              type="text"
              name="desc"
              onChange={ this.handleChange }
              value={ desc }
              data-testid="edit-input-description"
              id="input-description"
            />
          </label>
          <label htmlFor="input-image">
            Profile Picture:
            <input
              type="text"
              name="image"
              onChange={ this.handleChange }
              value={ image }
              data-testid="edit-input-image"
              id="input-image"
            />
          </label>
          <button
            type="button"
            name="button"
            disabled={ button }
            onClick={ this.saveProfile }
            data-testid="edit-button-save"
            style={ { maxWidth: 60 } }
          >
            Save
          </button>
        </form>
      )
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {loading ? <Loading /> : this.editProfile()}
      </div>
    );
  }
}

export default ProfileEdit;
