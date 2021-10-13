import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then(({ name: userName }) => this.setState({
      userName,
      loading: false,
    }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        { !loading ? <h3 data-testid="header-user-name">{ userName }</h3> : <Loading /> }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
