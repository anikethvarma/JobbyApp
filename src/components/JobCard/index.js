import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-card-bg">
        <div className="job-card-company-job-info">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-card-company-logo"
          />
          <div className="job-card-job-info-details">
            <p className="job-card-job-title">{title}</p>
            <div className="job-card-rating-container">
              <AiFillStar className="job-card-star" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-company-info">
          <div className="job-card-company-main-container">
            <div className="job-card-company-sub-container">
              <MdLocationOn className="job-card-company-sub-container-icon" />
              <p className="job-card-company-sub-container-description">
                {location}
              </p>
            </div>
            <div className="job-card-company-sub-container">
              <BsFillBriefcaseFill className="job-card-company-sub-container-icon" />
              <p className="job-card-company-sub-container-description">
                {employmentType}
              </p>
            </div>
          </div>
          <p className="job-card-company-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-hr-line" />
        <p className="job-card-description-title">Description</p>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
