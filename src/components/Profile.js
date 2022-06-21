import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    infoUser: null,
    loading: true,
  }

  async componentDidMount() {
    const info = await getUser();
    this.setState({
      infoUser: info,
      loading: false,
    });
  }

  profile = () => {
    const { infoUser } = this.state;
    const { name, image, email, description } = infoUser;
    return (
      <div className="profile">
        <img
          data-testid="profile-image"
          src={ image || 'https://cdn-icons-png.flaticon.com/512/74/74472.png' }
          alt="imagem do perfil"
        />
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <Link className="link-edit-perfil" to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile" className="contain-profile">
        <Header />
        {loading ? <Loading /> : this.profile()}
      </div>
    );
  }
}

export default Profile;
