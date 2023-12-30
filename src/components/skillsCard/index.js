import './index.css'

const SkillsCard = props => {
  const {skillObj} = props
  const {name, imageUrl} = skillObj

  return (
    <li className="eachListItem">
      <img className="logo" src={imageUrl} alt={name} />
      <p className="companyName">{name}</p>
    </li>
  )
}

export default SkillsCard
