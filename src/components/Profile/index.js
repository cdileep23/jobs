import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const differeProfileVews = {
  success: 'SUCCESS',
  Failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    apiProfileStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  submitSuccess = Details => {
    const formattedData = {
      name: Details.name,
      profileImageUrl: Details.profile_image_url,
      shortBio: Details.short_bio,
    }
    this.setState({
      profileDetails: formattedData,
      apiProfileStatus: differeProfileVews.success,
    })
  }

  submitFailure = () => {
    this.setState({apiProfileStatus: differeProfileVews.Failure})
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.profile_details)
      console.log(data.profile_details)
    } else if (data.status_code === 401) {
      this.submitFailure()
    }
  }

  renderSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profileCont">
        <img src={profileImageUrl} alt={name} />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  renderResult = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case differeProfileVews.success:
        return this.renderSuccess()
      case differeProfileVews.Failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  renderFailure = () => (
    <div className="failureCont">
      <button
        className="retryButton"
        onClick={this.getProfileDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  render() {
    return <div>{this.renderResult()}</div>
  }
}

export default Profile
