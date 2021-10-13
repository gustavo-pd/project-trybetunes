import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    getUser().then(({ name: userName }) => this.setState({
      userName,
      loading: true,
    }));
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        Header do teu pai
        <h2 data-testid="header-user-name">
          { !loading ? userName.name : <Loading />}
        </h2>
      </header>
    );
  }
}
