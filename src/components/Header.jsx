import React from 'react';
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
        <h2 data-testid="header-user-name">
          { !loading ? userName : <Loading />}
        </h2>
      </header>
    );
  }
}
