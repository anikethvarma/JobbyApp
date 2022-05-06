import './index.css'

const EmploymentTypeTab = props => {
  const {employmentTypeDetails, addJobType, removeJobType} = props
  const {employmentTypeId, label} = employmentTypeDetails

  const onClickCheckbox = event => {
    if (event.target.checked) {
      addJobType(employmentTypeId)
    } else {
      removeJobType(employmentTypeId)
    }
  }

  return (
    <li className="employment-type-tab-li">
      <input type="checkbox" id={employmentTypeId} onClick={onClickCheckbox} />
      <label htmlFor={employmentTypeId} className="employment-type-tab-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeTab
