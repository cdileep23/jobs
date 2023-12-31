import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoDesktop} from 'react-icons/io5'
import './index.css'

const JobsDetailsCard = props => {
  const {jobsData} = props

  const {
    companyLogoUrl,
    id,
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
  } = jobsData

  return (
    <Link className="class-link" to={`/jobs/${id}`}>
      <li className="eachJobItem">
        <div className="dflex">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />

          <div className="company-brief">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="job-rating" />
              <p> {rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details">
          <div className="dflex">
            <div className="dflex">
              <IoLocationSharp className="icons" />
              <p>{location}</p>
            </div>
            <div className="dflex">
              <IoDesktop className="icons" />
              <p>{employmentType}</p>
            </div>
          </div>

          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsDetailsCard
