import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import './index.css'

class Home extends Component {
  navigateToProductSection = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="jobs-home-description">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and potential
          </p>

          <Link className="nav-links " to="/jobs">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
