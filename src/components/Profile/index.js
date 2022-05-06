import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {status: 'INITIAL', profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      const formattedProfileDetails = {
        name: jsonData.profile_details.name,
        profileImageUrl: jsonData.profile_details.profile_image_url,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedProfileDetails,
        status: 'SUCCESS',
      })
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  retryProfile = () => {
    this.setState({status: 'INITIAL'}, this.getProfileDetails)
  }

  renderProfile = () => {
    const {profileDetails, status} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    switch (status) {
      case 'INITIAL':
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="profile-bg">
            <img
              src={profileImageUrl}
              alt="profile"
              className="profile-image"
            />
            <p className="profile-main-text">{name}</p>
            <p className="profile-text">{shortBio}</p>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="profile-failure-bg">
            <button
              type="button"
              className="profile-failure-button"
              onClick={this.retryProfile}
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
    return <div>{this.renderProfile()}</div>
  }
}

export default Profile
