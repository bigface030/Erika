import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { P, Span } from '../constants/style';

const PopupContent = styled.div`
    display: flex;
    justify-content: space-between;
    & a {
        text-decoration: underline ${props => props.theme.color.black};
    }
    & span {
        font-weight: ${props => props.theme.fontWeight.xl};
    }
`;

export const LoginPopup = () => {
    const popupCode = useSelector(state => state.general.popupCode);

    return (
        <>
            {popupCode === 'login' && (
                <PopupContent>
                    <P>請先登入！</P>
                    <Link to="/">
                        <Span>點我登入</Span>
                    </Link>
                </PopupContent>
            )}
        </>
    );
};
