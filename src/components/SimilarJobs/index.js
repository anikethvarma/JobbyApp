import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const similarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="similar-jobs-li">
        <div className="similar-jobs-top-info">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-jobs-top-logo"
          />
          <div className="similar-jobs-top-text-container">
            <h1 className="similar-jobs-title">{title}</h1>
            <div className="similar-jobs-rating-container">
              <AiFillStar className="similar-jobs-star" />
              <p className="similar-jobs-rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-job-description">Description</h1>
        <p className="similar-jobs-description-content">{jobDescription}</p>
        <div className="similar-jobs-info">
          <div className="similar-jobs-info-sub">
            <MdLocationOn className="similar-jobs-info-icon" />
            <p className="similar-jobs-info-text">{location}</p>
          </div>
          <div className="similar-jobs-info-sub">
            <BsFillBriefcaseFill className="similar-jobs-info-icon" />
            <p className="similar-jobs-info-text">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default similarJobs
