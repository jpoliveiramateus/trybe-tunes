import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    inputText: '',
    controlButton: true,
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

  render() {
    const { inputText, controlButton } = this.state;
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
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
