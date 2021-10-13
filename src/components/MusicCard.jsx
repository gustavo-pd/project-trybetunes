import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    const arrayOfMusic = [...musics];
    arrayOfMusic.splice(0, 1);
    return (
      <div>
        {arrayOfMusic.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
