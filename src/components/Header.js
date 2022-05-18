import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    api: '',
  }

  async componentDidMount() {
    const fetch = await getUser();
    this.setState({
      api: fetch,
    });
  }

  render() {
    const { api } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        { api ? <h3 data-testid="header-user-name">{api.name}</h3> : <Loading /> }
      </header>
    );
  }
}

export default Header;
