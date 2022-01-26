import { Link } from "react-router-dom";
import { H4, P, Span } from "../constants/style";

export const LinkItem = ({to, name, size}) => {

  return (
    <Link to={to}>
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
