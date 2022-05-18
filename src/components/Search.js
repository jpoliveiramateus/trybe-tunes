import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    inputText: '',
    controlButton: true,
    loading: false,
    api: null,
    nameArtist: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { inputText } = this.state;
      const minCharacters = 1;
      if (inputText.length > minCharacters) {
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

  fetchAlbum = async () => {
    const { inputText } = this.state;
    this.setState({
      inputText: '',
      controlButton: true,
      loading: true,
      nameArtist: inputText,
    });
    try {
      const albums = await searchAlbumsAPI(inputText);
      this.setState({
        api: albums,
      });
    } catch (error) {
      console.log(error);
    }
  }

  albumList = () => {
    const { api, nameArtist } = this.state;
    return (
      api.length > 0 ? (
        <div>
          <p>{`Resultado de álbuns de: ${nameArtist}`}</p>
          {api.map((card) => {
            const { artworkUrl100, collectionName, artistName, collectionId } = card;
            return (
              <div key={ collectionId }>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <h4>{collectionName}</h4>
                <p>{artistName}</p>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  Ir para o álbum
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nenhum álbum foi encontrado</p>
      )
    );
  }

  redirectLogin = () => {
    const { api } = this.state;
    if (api) return (this.albumList());
    return (<Loading />);
  };

  render() {
    const { inputText, controlButton, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            name="inputText"
            value={ inputText }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ controlButton }
            onClick={ this.fetchAlbum }
          >
            Pesquisar
          </button>
        </div>
        {loading && this.redirectLogin()}
      </div>
    );
  }
}

export default Search;
