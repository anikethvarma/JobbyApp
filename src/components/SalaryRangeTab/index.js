import './index.css'

const SalaryRangeTab = props => {
  const {salaryRangeDetails, setMinimumPackage} = props
  const {salaryRangeId, label} = salaryRangeDetails

  const onClickSalaryRange = () => {
    setMinimumPackage(salaryRangeId)
  }

  return (
    <li className="employment-type-tab-li">
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRange"
        onClick={onClickSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="employment-type-tab-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeTab
