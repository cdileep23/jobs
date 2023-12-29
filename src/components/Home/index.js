import {Component} from 'react'
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
          <h1 className="home-heading">Find The Jobs That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and potential
          </p>

          <button
            onClick={this.navigateToProductSection}
            type="button"
            className="find-jobs-button"
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
