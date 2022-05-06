import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentTypeTab from '../EmploymentTypeTab'
import SalaryRangeTab from '../SalaryRangeTab'
import Profile from '../Profile'
import JobCard from '../JobCard'

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

class Jobs extends Component {
  state = {
    jobsData: [],
    minimumPackage: '',
    jobTypeList: [],
    searchInput: '',
    status: 'INITIAL',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {minimumPackage, jobTypeList, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobTypeList}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jsonData = await response.json()

      const formattedJsonData = jsonData.jobs.map(eachElement => ({
        companyLogoUrl: eachElement.company_logo_url,
        employmentType: eachElement.employment_type,
        id: eachElement.id,
        jobDescription: eachElement.job_description,
        location: eachElement.location,
        packagePerAnnum: eachElement.package_per_annum,
        rating: eachElement.rating,
        title: eachElement.title,
      }))
      this.setState({
        jobsData: formattedJsonData,
        status: 'SUCCESS',
      })
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  setMinimumPackage = id => {
    this.setState({minimumPackage: id, status: 'INITIAL'}, this.getJobDetails)
  }

  addJobType = id => {
    const {jobTypeList} = this.state
    this.setState(
      {jobTypeList: [...jobTypeList, id], status: 'INITIAL'},
      this.getJobDetails,
    )
  }

  removeJobType = id => {
    const {jobTypeList} = this.state
    const updatedJobTypeList = jobTypeList.filter(
      eachElement => eachElement !== id,
    )
    this.setState(
      {jobTypeList: updatedJobTypeList, status: 'INITIAL'},
      this.getJobDetails,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState({status: 'INITIAL'}, this.getJobDetails)
  }

  retry = () => {
    this.setState({status: 'INITIAL'}, this.getJobDetails)
  }

  onSuccessRetrievingJobs = () => {
    const {jobsData} = this.state

    return (
      <ul className="jobs-right-ul">
        {jobsData.map(eachElement => (
          <JobCard key={eachElement.id} jobCardDetails={eachElement} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {status} = this.state
    switch (status) {
      case 'INITIAL':
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return this.onSuccessRetrievingJobs()
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
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <div className="jobs-main-container">
            <div className="jobs-right-search-bar-bg-mobile-search">
              <div className="jobs-right-search-bar">
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  className="jobs-right-search-input"
                  onChange={this.onChangeSearchInput}
                />
                <div className="jobs-right-search-icon-container">
                  <button
                    type="button"
                    testid="searchButton"
                    className="jobs-right-search-button"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="jobs-left-container">
              <Profile />
              <div className="jobs-left-sub-container">
                <hr className="jobs-left-hr" />
                <h1 className="jobs-left-sub-container-text">
                  Type of Employment
                </h1>
                <ul className="jobs-left-sub-container-mini">
                  {employmentTypesList.map(eachElement => (
                    <EmploymentTypeTab
                      key={eachElement.employmentTypeId}
                      employmentTypeDetails={eachElement}
                      addJobType={this.addJobType}
                      removeJobType={this.removeJobType}
                    />
                  ))}
                </ul>
              </div>
              <div className="jobs-left-sub-container">
                <hr className="jobs-left-hr" />
                <h1 className="jobs-left-sub-container-text">Salary Range</h1>
                <ul className="jobs-left-sub-container-mini">
                  {salaryRangesList.map(eachElement => (
                    <SalaryRangeTab
                      key={eachElement.salaryRangeId}
                      salaryRangeDetails={eachElement}
                      setMinimumPackage={this.setMinimumPackage}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-right-container">
              <div className="jobs-right-search-bar-bg-desktop-search">
                <div className="jobs-right-search-bar">
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    className="jobs-right-search-input"
                    onChange={this.onChangeSearchInput}
                  />
                  <div className="jobs-right-search-icon-container">
                    <button
                      type="button"
                      testid="searchButton"
                      className="jobs-right-search-button"
                      onClick={this.onClickSearch}
                    >
                      <BsSearch className="search-icon" />
                    </button>
                  </div>
                </div>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
