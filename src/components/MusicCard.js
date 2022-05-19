import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, async () => {
      const { music } = this.props;
      const { check } = this.state;
      if (check) {
        this.setState({ loading: true });
        await addSong(music);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="check"
            id={ trackId }
            onChange={ this.handleChange }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
