import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MEDIA_QUERY } from '../constants/style';
import { crumbMap } from '../constants/mapping';

const CrumbWrapper = styled.nav`
	${MEDIA_QUERY.xs} {
		display: none;
	}
`;

const CrumbContainer = styled.div`
	width: 90%;
	margin: 20px auto 10px;
	& ol {
		display: flex;
		flex-wrap: wrap;
	}
	& li {
		z-index: 1;
	}
`;

const CrumbPath = styled.li`
	& a {
		font-size: ${props => props.theme.fontSize.bodyLarge};
		font-weight: ${props => props.theme.fontWeight.l};
		color: ${props => props.theme.color.black};
		line-height: 1.5em;
		&:last-child {
			font-weight: ${props => props.theme.fontWeight.xl};
		}
	}
	& + li {
		margin-left: 5px;
		&::before {
			content: '>';
			margin-right: 5px;
		}
	}
`;

export const CrumbNav = ({ pathArr, name }) => {
	return (
		<CrumbWrapper>
			<CrumbContainer>
				<ol>
					<CrumbPath>
						<Link to="/">
							<FontAwesomeIcon icon={faHome} />
						</Link>
					</CrumbPath>
					{pathArr.slice(1).map((path, index) => (
						<CrumbPath key={index}>
							<Link to={pathArr.slice(0, index + 2).join('/')}>
								<span>{crumbMap[index][path]}</span>
							</Link>
						</CrumbPath>
					))}
					{name && (
						<CrumbPath>
							<Link to="#">
								<span>{name}</span>
							</Link>
						</CrumbPath>
					)}
				</ol>
			</CrumbContainer>
		</CrumbWrapper>
	);
};
