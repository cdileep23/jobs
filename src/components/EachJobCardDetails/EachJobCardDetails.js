import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../similarJobCard'

import JobsDetailsDetailedCard from '../jobDetailsDeatailedCard'
import './EachJobCardDetails.css'

const differentjobCardSuccess = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class EachJobCardDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: 'INITIAL',
  }

  componentDidMount = () => {
    this.getJob()
  }

  submitSuccess = (jobDetails, similarJobs) => {
    const newJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills.map(e => ({
        name: e.name,
        imageUrl: e.image_url,
      })),
      title: jobDetails.title,
      id: jobDetails.id,
    }

    const formattedSimilarJobs = similarJobs.map(e => ({
      companyLogoUrl: e.company_logo_url,
      title: e.title,
      employmentType: jobDetails.employment_type,
      location: e.location,
      jobDescription: e.job_description,
      rating: e.rating,
      id: e.id,
    }))
    console.log(formattedSimilarJobs)

    this.setState({
      jobDetails: newJobDetails,
      similarJobs: formattedSimilarJobs,
    })
    this.setState({apiStatus: differentjobCardSuccess.success})
  }

  getJob = async () => {
    this.setState({apiStatus: differentjobCardSuccess.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.submitSuccess(data.job_details, data.similar_jobs)
    } else if (data.status_code === 400) {
      this.submitFailure()
    }
  }

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div>
        <div className="job-card">
          <JobsDetailsDetailedCard jobsData={jobDetails} />
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>

        <ul className="similar-jobs-cont">
          {similarJobs.map(e => (
            <SimilarJobCard jobsData={e} key={e.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case differentjobCardSuccess.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case differentjobCardSuccess.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className="bg-cont">
        <Header />
        <div>{this.renderResult()}</div>
      </div>
    )
  }
}

export default EachJobCardDetails
