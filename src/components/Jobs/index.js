import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import FilterGroup from '../FilterGroup/index'
import JobsDetailsCard from '../jobsDetailsCard/index'
import Profile from '../Profile/index'
import NotFound from '../NotFound'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiViews = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADING',
  empty: 'EMPTY',
}

class Jobs extends Component {
  state = {
    apiStatus: 'INITIAL',
    jobsList: [],
    searchValinput: '',
    onchangeInputVal: '',
    activeRatingId: '1000000',

    employmentTypeArray: [],
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

    if (newData.length === 0) {
      this.setState({apiStatus: apiViews.empty})
    } else {
      this.setState({jobsList: newData, apiStatus: apiViews.success})
    }
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.getJobs)
  }

  apiViewFailure = () => {
    this.setState({apiStatus: apiViews.failure})
  }

  getJobs = async () => {
    const {searchValinput, activeRatingId, employmentTypeArray} = this.state
    const employmentType = employmentTypeArray.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&search=${searchValinput}&minimum_package=${activeRatingId}`
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
    } else {
      this.apiViewFailure()
    }
  }

  changeEmployement = string => {
    const {employmentTypeArray} = this.state
    if (this.checkWhetherElementPresentOrNot(string) === true) {
      const index = employmentTypeArray.indexOf(string)

      employmentTypeArray.splice(index, 1)
      this.setState({employmentTypeArray}, this.getJobs)
    } else {
      employmentTypeArray.push(string)
      this.setState({employmentTypeArray}, this.getJobs)
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

  checkWhetherElementPresentOrNot = string => {
    const {employmentTypeArray} = this.state
    let isPresent = false

    for (let i = 0; i < employmentTypeArray.length; i += 1) {
      if (employmentTypeArray[i] === string) {
        isPresent = true
        return isPresent
      }
    }
    return isPresent
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiViews.success:
        return this.renderForSucces()
      case apiViews.loader:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiViews.failure:
        return (
          <div className="failure-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
              alt="failure view"
            />
            <h1>Oops Something Went Wrong</h1>
            <p>we cannot seem to find the page you are looking for</p>
            <button onClick={this.getJobs} type="button">
              Retry
            </button>
          </div>
        )

      case apiViews.empty:
        return (
          <div className="empty-list-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="noJobsImage"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
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
    const {activeRatingId, employmentTypeArray} = this.state
    console.log(employmentTypeArray)
    return (
      <div className="bgCont">
        <Header />
        <div className="namesDisplayingCont">
          <div className="filters-container">
            <Profile />
            <FilterGroup
              employmentTypeArray={this.employmentTypeArray}
              changeEmployement={this.changeEmployement}
              activeRatingId={activeRatingId}
              changeRating={this.changeRating}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>

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
            <div>{this.renderResult()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
