import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'

import JobsDetailsCard from '../jobsDetailsCard/index'
import Profile from '../Profile/index'
import './index.css'

const apiViews = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiStatus: 'INITIAL',
    jobsList: [],
    searchValinput: '',
    onchangeInputVal: '',
  }

  componentDidMount = () => {
    this.getJobs()
  }

  apiViewSuccess = jobs => {
    const newData = jobs.map(e => ({
      employmentType: e.employment_type,
      id: e.id,
      companyLogoUrl: e.company_logo_url,
      jobDescription: e.job_description,
      location: e.location,
      packagePerAnnum: e.package_per_annum,
      rating: e.rating,
      title: e.title,
    }))
    console.log(newData)
    this.setState({jobsList: newData, apiStatus: apiViews.success})
  }

  getJobs = async () => {
    const {searchValinput} = this.state
    const url = `https://apis.ccbp.in/jobs?search=${searchValinput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({apiStatus: 'LOADING'})
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.apiViewSuccess(data.jobs)
    }
  }

  renderForSucces = () => {
    const {jobsList} = this.state
    return (
      <ul className="uList">
        {jobsList.map(jobDetails => (
          <JobsDetailsCard key={jobDetails.id} jobsData={jobDetails} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiViews.success:
        return this.renderForSucces()
      case apiViews.loader:
        return (
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        )
      default:
        return null
    }
  }

  updateInputValue = () => {
    const {onchangeInputVal} = this.state
    this.setState({searchValinput: onchangeInputVal}, this.getJobs)
  }

  updateInput = event => {
    this.setState({
      onchangeInputVal: event.target.value,
    })
  }

  render() {
    return (
      <div className="bgCont">
        <Header />
        <div className="namesDisplayingCont">
          <Profile />
          <div className="jobsList">
            <div className="search-bar-container">
              <input
                placeholder="search"
                className="input-element"
                type="search"
                onChange={this.updateInput}
              />
              <button
                onClick={this.updateInputValue}
                type="button"
                className="button1"
                alt="button"
                data-testid="searchButton"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            {this.renderResult()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
