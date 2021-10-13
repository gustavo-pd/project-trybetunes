import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from './Loading';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      loadingPage: false,
      fetchAPI: false,
      notFetch: false,
      fetchAlbuns: [],
    };
  }

  handlerInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handlerButton = async () => {
    this.setState({
      loadingPage: true,
    });
    const { searchArtist } = this.state;
    const nameOf = searchArtist;
    const fetchAlbuns = await searchAlbumsAPI(searchArtist);
    if (fetchAlbuns < 1) {
      this.setState({
        searchArtist: '',
        loadingPage: false,
        fetchAPI: false,
        notFetch: true,
        nameOf,
      });
    } else {
      this.setState({
        searchArtist: '',
        loadingPage: false,
        fetchAPI: true,
        notFetch: false,
        nameOf,
        fetchAlbuns,
      });
    }
  }

  render() {
    const {
      searchArtist,
      fetchAPI,
      notFetch,
      nameOf,
      fetchAlbuns,
      loadingPage,
    } = this.state;
    const n = 2;
    const artist = `Resultado de álbuns de: ${nameOf}`;
    const albumCards = (
      fetchAlbuns.map(({ collectionId, artistName, artworkUrl100, collectionName }) => (
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          key={ collectionId }
        >
          <div>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <p>{collectionName}</p>
            <p>{artistName}</p>
          </div>
        </Link>
      ))
    );

    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchArtist"
          value={ searchArtist }
          onChange={ this.handlerInput }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          onClick={ this.handlerButton }
          disabled={ searchArtist.length < n }
        >
          Pesquisar
        </button>
        { loadingPage && <Loading /> }
        { notFetch && <p>Nenhum álbum foi encontrado</p> }
        { fetchAPI && <p>{ artist }</p> }
        { fetchAPI && albumCards }
      </div>
    );
  }
}
