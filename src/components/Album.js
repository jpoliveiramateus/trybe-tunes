import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    api: '',
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    try {
      const musics = await getMusics(id);
      this.setState({
        api: musics,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { loading, api } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <p data-testid="artist-name">{api[0].artistName}</p>
            <p data-testid="album-name">{api[0].collectionName}</p>
            {api.filter((music) => music.trackId).map((music) => {
              const { trackName, previewUrl } = music;
              return (<MusicCard
                key={ trackName }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />);
            })}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default Album;
