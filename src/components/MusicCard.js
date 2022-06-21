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

  handleChange = ({ target }) => {
    const { name } = target;
    const { check } = this.state;
    const { music, attList } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, async () => {
      if (check) {
        this.setState({ loading: true });
        await removeSong(music);
        this.setState({ loading: false });
        attList();
      } else {
        this.setState({ loading: true });
        await addSong(music);
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, check } = this.state;
    return (
      <div className="music-card-player">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="check"
            id={ trackId }
            onChange={ this.handleChange }
            checked={ check }
          />
          Favorita
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
  attList: PropTypes.func,
}.isRequired;

MusicCard.defaultProps = {
  attList: () => {},
};

export default MusicCard;
