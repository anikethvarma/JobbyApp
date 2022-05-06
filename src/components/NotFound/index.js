import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg">
      <div className="not-found-main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-main-text">Page Not Found</h1>
        <p className="not-found-text">
          we{`'`}re sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </>
)

export default NotFound
