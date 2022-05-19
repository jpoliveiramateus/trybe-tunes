import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    loading: true,
    list: [],
  }

  async componentDidMount() {
    const list = await getFavoriteSongs();
    this.setState({
      list,
      loading: false,
    });
  }

  attList = async () => {
    this.setState({ loading: true });
    this.setState({
      list: await getFavoriteSongs(),
      loading: false,
    });
  }

  favoriteList = () => {
    const { list } = this.state;
    if (list.length) {
      return list.map((music) => {
        const { trackName, previewUrl, trackId } = music;
        return (
          <MusicCard
            key={ trackName }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            music={ music }
            attList={ this.attList }
          />
        );
      });
    }
    return (<p>Não há músicas favoritas</p>);
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : this.favoriteList()}
      </div>
    );
  }
}

export default Favorites;
