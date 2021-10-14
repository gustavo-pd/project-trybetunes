import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: 'email@test.com',
      image: 'url-to-image',
      description: 'Lorem ipsum',
      redirect: false,
    };
  }

  componentDidMount() {
    this.renderUser();
  }

  renderUser = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      loading: true,
    });
  }

  handlerButton = async () => {
    this.setState({
      loading: false,
    });
    const { name, email, image, description } = this.state;
    const userProfile = { name, email, image, description };
    await updateUser(userProfile);
    this.setState({
      redirect: true,
    });
  }

  handlerInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loading, name, email, image, description, redirect } = this.state;
    const showButton = image.length > 1 && description !== '' && name !== ''
    && email !== '' && email.split('').includes('@');
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {!loading && <Loading />}
        <form>
          <label htmlFor="name">
            Digite o novo nome de usuário:
            <input
              value={ name }
              onChange={ this.handlerInput }
              type="text"
              name="name"
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="email">
            Digite o novo email do usuário:
            <input
              value={ email }
              onChange={ this.handlerInput }
              type="text"
              name="email"
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="description">
            Digite a sua nova descrição:
            <input
              value={ description }
              onChange={ this.handlerInput }
              type="text"
              name="description"
              data-testid="edit-input-description"
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              value={ image }
              onChange={ this.handlerInput }
              type="text"
              name="image"
              data-testid="edit-input-image"
            />
          </label>
          <button
            disabled={ !showButton }
            data-testid="edit-button-save"
            type="button"
            onClick={ this.handlerButton }
          >
            Atualizar
          </button>
        </form>
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
