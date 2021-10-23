import { Link } from "react-router-dom";

export const LinkItem = ({to, name}) => {
  const handleUncheckNav = () => {
    document.querySelector('#nav').checked = false
  }
  return (
    <Link to={to} onClick={handleUncheckNav}>
      <span>{name}</span>
    </Link>
  )
}
