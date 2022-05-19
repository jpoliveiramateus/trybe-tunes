import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    check: false,
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    const { music: { trackId } } = this.props;
    const filter = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({
      check: filter,
    });
  }

  handleChange = async ({ target }) => {
    const { name } = target;
    const { check } = this.state;
    const { music } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, async () => {
      if (check) {
        this.setState({ loading: true });
        await removeSong(music);
        this.setState({ loading: false, check: false });
      } else {
        this.setState({ loading: true });
        await addSong(music);
        this.setState({ loading: false, check: true });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
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
            checked={ check }
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
