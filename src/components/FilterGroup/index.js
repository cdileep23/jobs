import './index.css'

const FilterGroup = props => {
  const renderRatingsFiltersList = () => {
    const {salaryRangesList} = props

    console.log(props)
    return salaryRangesList.map(e => {
      const {changeRating} = props
      const onClickRatingItem = event => {
        console.log(event.target.id)

        changeRating(event.target.id)
      }

      return (
        <li className="rating-item" key={e.salaryRangeId}>
          <input
            onClick={onClickRatingItem}
            type="radio"
            name="salaryRange"
            id={e.salaryRangeId}
            value={e.label}
          />
          <label htmlFor={e.salaryRangeId}>{e.label}</label>
        </li>
      )
    })
  }

  const renderRatingsEmploymentList = () => {
    const {employmentTypesList, employmentTypeArray} = props

    return employmentTypesList.map(e => {
      const {changeEmployement} = props

      const onClickEmploymentItem = event => {
        console.log(event.target.id)

        changeEmployement(event.target.id)
      }

      return (
        <li className="rating-item" key={e.employmentTypeId}>
          <input
            onClick={onClickEmploymentItem}
            type="checkbox"
            name="salaryRange"
            id={e.employmentTypeId}
            value={e.label}
          />
          <label htmlFor={e.employmentTypeId}>{e.label}</label>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <form className="ratings-list">{renderRatingsFiltersList()}</form>
    </div>
  )

  const renderemploymentType = () => (
    <div>
      <h1 className="rating-heading">Type of Employment</h1>
      <form className="ratings-list">{renderRatingsEmploymentList()}</form>
    </div>
  )

  const finalCont = () => (
    <div className="filter-container">
      <hr />
      {renderemploymentType()}

      <hr />
      {renderRatingsFilters()}
    </div>
  )

  return finalCont()
}

export default FilterGroup
