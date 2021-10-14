import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: 'email@test.com',
      image: 'url-to-image',
      description: 'Lorem ipsum',
    };
  }

  componentDidMount() {
    this.renderUser();
  }

  renderUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      name: user.name,
      loading: false,
    });
  }

  render() {
    const { loading, name, email, image, description } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <Loading />}
        <section>
          <img data-testid="profile-image" src={ image } alt={ name } />
          <Link to="/profile/edit">Editar perfil</Link>
          <p><strong>Nome do usuário:</strong></p>
          <p>{ name }</p>
          <p><strong>Email:</strong></p>
          <p>{ email }</p>
          <p><strong>Descrição:</strong></p>
          <p>{ description }</p>
        </section>
      </div>
    );
  }
}
