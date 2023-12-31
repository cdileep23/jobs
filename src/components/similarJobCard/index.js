import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoDesktop} from 'react-icons/io5'
import './index.css'

const SimilarJobCard = props => {
  const {jobsData} = props

  const {
    companyLogoUrl,
    id,
    title,
    rating,

    location,
    jobDescription,
    employmentType,
  } = jobsData

  return (
    <li className="special-cont">
      <div className="dflex">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />

        <div>
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <FaStar className="job-rating" />
            <p>{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="job-description">Description</h1>
      <p>{jobDescription}</p>
      <div className="dflex jobs-location">
        <div className="dflex">
          <IoLocationSharp className="icons" />
          <p>{location}</p>
        </div>
        <div className="dflex">
          <IoDesktop className="icons" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
