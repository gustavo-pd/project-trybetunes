import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      band: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    this.setState({
      album: musicList[0].collectionName,
      band: musicList[0].artistName,
      musics: musicList,
    });
  }

  render() {
    const { album, band, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{`${band}`}</p>
        <p data-testid="album-name">{`${album}`}</p>
        { musics.slice(1)
          .map((music, i) => <MusicCard music={ music } key={ i } />) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
