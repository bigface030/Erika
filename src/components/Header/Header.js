import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Btn, TextBtn } from '../../constants/style';
import { MEDIA_QUERY } from '../../constants/style';

import { Nav, MobileNav } from './Nav';
import { Cart } from './Cart';
import { Logo } from '../Logo';
import { useRef } from 'react';
import { useEffect } from 'react';

const HeaderWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: ${props => props.theme.color.white};
	box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
`;

const HeaderContainer = styled.div`
	height: 70px;
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	& > h1 {
		display: none;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		${MEDIA_QUERY.main} {
			display: block;
		}
		${MEDIA_QUERY.xs} {
			display: none;
		}
	}
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	${MEDIA_QUERY.main} {
		& > h1 {
			display: none;
		}
	}
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	& > a {
		margin-right: 30px;
		${MEDIA_QUERY.main} {
			display: none;
		}
	}
`;

const BurgerBtn = styled(Btn)`
	display: none;
	${MEDIA_QUERY.main} {
		display: block;
	}
`;

const BurgerInput = styled.input`
	${MEDIA_QUERY.main} {
		display: block;
	}
	position: absolute;
	left: 0;
	display: none;
	opacity: 0;
	z-index: -1;
	& ~ nav {
		& > ul {
			left: -380px;
			transition: 0.25s;
		}
	}
	&:checked ~ nav {
		& > ul {
			left: 0;
		}
	}
	&:checked + button {
		& label::after {
			display: none;
			content: '';
			width: 100%;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 11;
			background: rgba(0, 0, 0, 0.7);
			${MEDIA_QUERY.main} {
				display: block;
			}
		}
	}
`;

const MenuBtnGroup = styled.div`
	display: flex;
	& > div {
		${MEDIA_QUERY.main} {
			&:nth-child(-n + 2) {
				display: none;
			}
		}
		& + div {
			margin-left: 30px;
		}
	}
`;

const ToAdminBtn = styled(TextBtn)``;

export default function Header() {
	const navDOM = useRef();
	const { pathname, search } = useLocation();

	const style = {
		height: '70px',
		position: 'relative',
		zIndex: '10',
	};

	useEffect(() => {
		navDOM.current.checked = false;
	}, [pathname, search]);

	return (
		<header style={style}>
			<HeaderWrapper>
				<HeaderContainer>
					<HeaderLeft>
						<BurgerInput id="nav" type="checkbox" ref={navDOM} />
						<BurgerBtn>
							<label htmlFor="nav">
								<FontAwesomeIcon icon={faBars} />
							</label>
						</BurgerBtn>
						<MobileNav />
						<Logo />
						<Nav />
					</HeaderLeft>
					<Logo />
					<HeaderRight>
						<Link to="/admin/product">
							<ToAdminBtn $white $active>
								管理後台
							</ToAdminBtn>
						</Link>
						<MenuBtnGroup>
							<div>
								<Btn>
									<Link to="#">
										<FontAwesomeIcon icon={faUser} />
									</Link>
								</Btn>
							</div>
							<div>
								<Btn>
									<Link to="#">
										<FontAwesomeIcon icon={faHeart} />
									</Link>
								</Btn>
							</div>
							<Cart />
						</MenuBtnGroup>
					</HeaderRight>
				</HeaderContainer>
			</HeaderWrapper>
		</header>
	);
}
