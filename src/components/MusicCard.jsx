import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  handlerCheck = async ({ target: { id, checked } }) => {
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(id);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(id);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  }

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading, checked } = this.state;
    const divTrack = (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            checked={ checked }
            onChange={ this.handlerCheck }
          />
        </label>
      </div>
    );

    return (
      !loading ? divTrack : <Loading />
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
