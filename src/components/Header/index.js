import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const LogoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-cont">
      <img
        alt="website logo"
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      />

      <div className="div-links">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/jobs">
          Jobs
        </Link>
      </div>

      <button onClick={LogoutUser} className="logout-button" type="button">
        logout
      </button>
    </div>
  )
}
export default withRouter(Header)
