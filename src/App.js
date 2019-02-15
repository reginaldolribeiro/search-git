import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './services/api';

class App extends Component {

  state = {
    repositories: []
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.repository = document.querySelector('input[name=repository]').value

    const response = await api.get(`/repos/${this.repository}`)

    this.setState({ repositories: [...this.state.repositories, response.data] })

    document.querySelector('input[name=repository]').value = ''

  }

  render() {
    return (
      <div className="App">
        <h1>repository</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="repository" />
          <button type="submit">Adicionar</button>
        </form>
        {this.state.repositories.map(repository => (
          <div key={repository.id} className="git-list">
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
            <img src={repository.owner.avatar_url} alt={repository.name}/>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
