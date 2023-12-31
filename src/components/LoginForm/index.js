import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  submitFailure = err => {
    this.setState({errorMsg: err})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 60})
    history.replace('/')
  }

  verifyUserDetails = async event => {
    const {username, password} = this.state
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else if (data.status_code === 400) {
      this.setState({showErrorMsg: true})
      this.submitFailure(data.error_msg)
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderInputUserName = () => {
    const {username} = this.state

    const a = 'ddd'
    return (
      <div className="eachInputField">
        <label className="input-label" htmlFor="USERNAME">
          USERNAME
        </label>
        <br />
        <input
          placeholder="USERNAME"
          className="input-text "
          id="USERNAME"
          type="text"
          onChange={this.updateUsername}
          value={username}
        />
      </div>
    )
  }

  renderInputPassword = () => {
    const {password} = this.state
    const a = 'ddd'
    return (
      <div className="eachInputField">
        <label className="input-label" htmlFor="PASSWORD">
          PASSWORD
        </label>
        <br />
        <input
          placeholder="PASSWORD"
          className="input-text "
          id="PASSWORD"
          type="password"
          value={password}
          onChange={this.updatePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-from-cont">
        <form onSubmit={this.verifyUserDetails} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          {this.renderInputUserName()}
          {this.renderInputPassword()}

          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrorMsg && <p className="err-msg">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
