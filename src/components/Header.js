import React from 'react';
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
        { api ? <h3 data-testid="header-user-name">{api.name}</h3> : <Loading /> }
      </header>
    );
  }
}

export default Header;
