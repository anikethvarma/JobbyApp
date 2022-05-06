import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(jsonData.jwt_token)
    } else {
      this.onSubmitFailure(jsonData.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <div className="login-main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form onSubmit={this.onSubmitForm} className="login-form">
            <div className="login-sub-container">
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="login-sub-container">
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {showSubmitError && (
            <div className="login-error-msg-container">
              <p className="error-msg">*{errorMsg}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Login
