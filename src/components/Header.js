import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
// import Loading from './Loading';

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
      <header data-testid="header-component" className="header-component">
        <div className="contain-user-name">
          <img src="/logo192.png" alt="logoreact" />
          { api
            ? <span data-testid="header-user-name">{api.name}</span>
            : <span>Carregando...</span>}
        </div>
        <div className="links">
          <div className="contain-links">
            <div>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="link-one"
              >
                Search

              </Link>
            </div>
            <div>
              <Link
                to="/favorites"
                className="link-two"
                data-testid="link-to-favorites"
              >
                Favorites

              </Link>
            </div>
            <div>
              <Link
                to="/profile"
                className="link-three"
                data-testid="link-to-profile"
              >
                Profile

              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
