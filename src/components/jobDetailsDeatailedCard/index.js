import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp, IoDesktop} from 'react-icons/io5'
import {MdDirections} from 'react-icons/md'
import SkillsCard from '../skillsCard'
import './index.css'

const JobsDetailsDetailedCard = props => {
  const {jobsData} = props

  const {
    companyLogoUrl,
    id,
    lifeAtCompany,
    skills,
    companyWebsiteUrl,
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    employmentType,
  } = jobsData
  console.log(skills)
  return (
    <div className="eachJobItem">
      <div className="dflex">
        <img className="company-logo" src={companyLogoUrl} alt="company" />

        <div>
          <h1 className="job-title">{title}</h1>
          <div>
            <FaStar className="job-rating" />
            {rating}
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
      <div className="navigate-container">
        <h1 className="job-description">Description</h1>

        <a className="nav-link" href={companyWebsiteUrl}>
          <div className="dflex">
            <p>Visit</p>
            <MdDirections className="navigate-icon" />
          </div>
        </a>
      </div>

      <p>{jobDescription}</p>

      <h1 className="job-description">Skills</h1>
      <ul className="skills-list">
        {skills.map(e => (
          <SkillsCard skillObj={e} key={e.name} />
        ))}
      </ul>

      <h1 className="job-description">Life At Company</h1>

      <div className="company-lifestyle">
        <p className="para">{lifeAtCompany.description}</p>
        <img className="company-image" src={lifeAtCompany.imageUrl} alt="kk" />
      </div>
    </div>
  )
}

export default JobsDetailsDetailedCard
