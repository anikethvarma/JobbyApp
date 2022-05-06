import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-bg">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="header-nav-link-ul-desktop">
        <Link to="/" className="nav-link">
          <li className="header-nav-link-li-desktop">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="header-nav-link-li-desktop">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="header-logout-button" onClick={logout}>
        Logout
      </button>
      <ul className="header-nav-link-ul-mobile">
        <Link to="/">
          <li className="header-nav-link-li-mobile">
            <AiFillHome className="header-nav-link-icon" />
          </li>
        </Link>
        <Link to="/jobs">
          <li className="header-nav-link-li-mobile">
            <BsFillBriefcaseFill className="header-nav-link-icon" />
          </li>
        </Link>
        <li className="header-nav-link-li-mobile" onClick={logout}>
          <FiLogOut className="header-nav-link-icon" />
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
