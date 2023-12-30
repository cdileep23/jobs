import './index.css'

const FilterGroup = props => {
  const {employmentTypesList, salaryRangesList} = props
  console.log(`hello ${employmentTypesList}`)
  return (
    <div className="filter-group-container">
      <hr className="hr-element" />

      <h1 className="main-heading">Type of Employment</h1>
    </div>
  )
}

export default FilterGroup
