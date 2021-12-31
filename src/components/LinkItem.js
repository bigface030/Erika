import { Link } from "react-router-dom";
import { H4, P, Span } from "../constants/style";

export const LinkItem = ({to, name, size}) => {
  const handleUncheckNav = () => {
    document.querySelector('#nav').checked = false;
    document.querySelector('#cart').checked = false;
  }
  return (
    <Link to={to} onClick={handleUncheckNav}>
      {size === 'H4' && (
        <H4>{name}</H4>
      )}
      {size === 'P' && (
        <P>{name}</P>
      )}
      {size === 'Span' && (
        <Span>{name}</Span>
      )}
    </Link>
  )
}
