import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobDetails extends Component {
  state = {jobDetailsList: [], similarJobsList: [], status: 'INITIAL'}

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jsonData = await response.json()

      const jobDetails = jsonData.job_details
      const similarJobs = jsonData.similar_jobs

      const formattedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompanyDescription: jobDetails.life_at_company.description,
        lifeAtCompanyImageUrl: jobDetails.life_at_company.image_url,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(eachElement => ({
          imageUrl: eachElement.image_url,
          name: eachElement.name,
        })),
        title: jobDetails.title,
      }

      const formattedSimilarJobs = similarJobs.map(eachElement => ({
        companyLogoUrl: eachElement.company_logo_url,
        employmentType: eachElement.employment_type,
        id: eachElement.id,
        jobDescription: eachElement.job_description,
        location: eachElement.location,
        rating: eachElement.rating,
        title: eachElement.title,
      }))

      this.setState({
        jobDetailsList: formattedJobDetails,
        similarJobsList: formattedSimilarJobs,
        status: 'SUCCESS',
      })
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  retry = () => {
    this.setState({status: 'INITIAL'}, this.getJobDetailsData)
  }

  renderJobDetails = () => {
    const {jobDetailsList, similarJobsList, status} = this.state

    switch (status) {
      case 'INITIAL':
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="job-details-main-container">
            <div className="job-details-main-card">
              <div className="job-details-company-top-info">
                <img
                  src={jobDetailsList.companyLogoUrl}
                  alt="job details company logo"
                  className="job-details-company-logo"
                />
                <div className="job-details-company-top-info-text-container">
                  <h1 className="job-details-company-top-info-text">
                    {jobDetailsList.title}
                  </h1>
                  <div className="job-details-rating-container">
                    <AiFillStar className="job-details-star" />
                    <p className="job-details-rating">
                      {jobDetailsList.rating}
                    </p>
                  </div>
                </div>
              </div>

              <div className="job-details-company-info">
                <div className="job-details-company-main-container">
                  <div className="job-details-company-sub-container">
                    <MdLocationOn className="job-details-company-sub-container-icon" />
                    <p className="job-details-company-sub-container-description">
                      {jobDetailsList.location}
                    </p>
                  </div>
                  <div className="job-details-company-sub-container">
                    <BsFillBriefcaseFill className="job-details-company-sub-container-icon" />
                    <p className="job-details-company-sub-container-description">
                      {jobDetailsList.employmentType}
                    </p>
                  </div>
                </div>
                <p className="job-details-company-package">
                  {jobDetailsList.packagePerAnnum}
                </p>
              </div>
              <hr className="job-details-hr-line" />

              <div className="job-details-description-bg">
                <h1 className="job-details-description">Description</h1>
                <div
                  className="job-details-visit-container"
                  href={jobDetailsList.companyWebsiteUrl}
                >
                  <a
                    className="job-details-visit-text"
                    href={jobDetailsList.companyWebsiteUrl}
                  >
                    Visit
                  </a>
                  <FiExternalLink className="visit-icon" />
                </div>
              </div>

              <p className="job-details-description-content">
                {jobDetailsList.jobDescription}
              </p>
              <h1 className="job-details-skills">Skills</h1>
              <ul className="job-details-skills-ul">
                {jobDetailsList.skills.map(eachElement => (
                  <li className="job-details-skills-li" key={eachElement.name}>
                    <img
                      src={eachElement.imageUrl}
                      className="job-details-skills-img"
                      alt={eachElement.name}
                    />
                    <p className="job-details-skills-text">
                      {eachElement.name}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="job-details-life-bg">
                <div className="job-details-life-text-container">
                  <h1 className="job-details-life-text">Life at Company</h1>
                  <p className="job-details-life-sub-text">
                    {jobDetailsList.lifeAtCompanyDescription}
                  </p>
                </div>
                <img
                  src={jobDetailsList.lifeAtCompanyImageUrl}
                  className="job-details-img"
                  alt="life at company"
                />
              </div>
            </div>
            <h1 className="job-details-similar-jobs-main-text">Similar Jobs</h1>
            <ul className="job-details-similar-jobs-ul">
              {similarJobsList.map(eachElement => (
                <SimilarJobs
                  key={eachElement.id}
                  similarJobsDetails={eachElement}
                />
              ))}
            </ul>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="jobs-failure-image"
            />
            <h1 className="jobs-failure-main-text">
              Oops! Something Went Wrong
            </h1>
            <p className="jobs-failure-text">
              We cannot seem to find the page you are looking for
            </p>
            <button
              type="button"
              className="jobs-failure-button"
              onClick={this.retry}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobDetails
