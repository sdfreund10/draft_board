import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { postData } from './fetchUtils'

export class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  logIn (event) {
    event.preventDefault();
    postData('/sessions', { session: { username: this.state.value } }).then(
      (response) => response.json()
    ).then(
      (responseJSON) => this.handleError(responseJSON)
    )
  }

  signUp (event) {
    event.preventDefault();
    postData('/users', { user: { username: this.state.value }}).then(
      (response) => response.json()
    ).then(
      (responseJSON) => this.handleError(responseJSON)
    )
  }

  setError(message) {
    this.setState({ error: message });
  }

  handleError (response) {
    if (response.status === 200) {
      this.props.setUser(response.body);
    } else if (response.body.username.includes('has already been taken')) {
      this.setState({ error: 'Username already taken' })
    } else if (response.body.user.includes('user not found')) {
      this.setState({ error: 'User not found' })
    } else {
      this.setState({ error: 'Please try again' })
    }
  }

  render () {
    return(
      <div className='text-center text-primary'>
        <h1>Log In / Sign Up</h1>
        <form className='form' onSubmit={this.logIn}>
          <div className="form-group text-secondary">
            <div><label>Enter Your Username</label></div>
            <div><input value={this.state.value} onChange={this.handleChange}/></div>
          </div>
          <div className="btn-group btn-group-md">
            <button type='button' className='btn btn-primary' onClick={this.logIn}>Sign In</button>
            <button type='button' className='btn btn-secondary' onClick={this.signUp}>Sign Up</button>
          </div>
        </form>
        {this.state.error !== '' &&
          <div className='text-center text-danger'>
            <p>{this.state.error}</p>
          </div>}
      </div>
    )
  }
}
