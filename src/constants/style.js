import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from './theme';

export const MEDIA_QUERY = {
	l: '@media (max-width: 1366px)',
	main: '@media (max-width: 1024px)',
	m: '@media (max-width: 768px)',
	s: '@media (max-width: 512px)',
	xs: '@media (max-width: 256px)',
};

export const LinkedTag = styled(Link)`
	&::after {
		content: '';
		display: block;
		width: 0%;
		height: 2px;
		background-color: ${theme.color.black};
		transition: width 0.4s;
	}
	&:hover {
		&::after {
			width: 100%;
		}
	}
`;

export const fontTheme = {
	h2: css`
		font-size: ${theme.fontSize.h2};
		font-weight: ${theme.fontWeight.xl};
		line-height: 2em;
	`,
	h3: css`
		font-size: ${theme.fontSize.h3};
		font-weight: ${theme.fontWeight.xl};
		line-height: 1.5em;
	`,
	h4: css`
		font-size: ${theme.fontSize.h4};
		font-weight: ${theme.fontWeight.l};
		line-height: 1.5em;
	`,
	h5: css`
		font-size: ${theme.fontSize.bodySmall};
		font-weight: ${theme.fontWeight.s};
		line-height: 1.5em;
	`,
	p: css`
		font-size: ${theme.fontSize.bodyLarge};
		font-weight: ${theme.fontWeight.l};
		line-height: 1.5em;
	`,
	span: css`
		font-size: ${theme.fontSize.body};
		font-weight: ${theme.fontWeight.m};
		line-height: 1.5em;
	`,
};

export const H2 = styled.h2`
	${fontTheme.h2}
	color: ${theme.color.black};
`;

export const H3 = styled.h3`
	${fontTheme.h3}
	color: ${theme.color.black};
`;

export const H4 = styled.h4`
	${fontTheme.h4}
	color: ${theme.color.black};
`;

export const P = styled.p`
	${fontTheme.p}
	color: ${theme.color.black};
`;

export const Span = styled.span`
	${fontTheme.span}
	color: ${theme.color.black};
`;

export const H5 = styled.h5`
	${fontTheme.h5}
	color: ${theme.color.black};
`;

export const Btn = styled.button`
	& svg {
		font-size: ${theme.fontSize.svg};
		color: ${theme.color.lightGrey};
		transition: 0.2s;
	}
	&:hover svg {
		cursor: pointer;
		color: ${theme.color.grey};
	}
`;

export const TextBtn = styled.button`
	padding: 5px 15px;
	border-radius: 0.25em;
	transition: 0.2s;

	${fontTheme.span}
	font-weight: ${props => props.theme.fontWeight.l};

	border: 1px solid
		${props =>
			props.$active
				? props.theme.color.black
				: props.theme.color.lightGrey};
	background-color: ${props =>
		props.$white && props.$active
			? props.theme.color.white
			: props.$white
			? props.theme.color.light_primary
			: props.$active
			? props.theme.color.black
			: props.theme.color.lightGrey};
	color: ${props =>
		!props.$white
			? props.theme.color.white
			: props.$active
			? props.theme.color.black
			: props.theme.color.grey};
	&:hover {
		border-color: ${props =>
			props.$white && props.$active
				? props.theme.color.black
				: props.theme.color.lightGrey};
		background-color: ${props =>
			!props.$white
				? props.theme.color.lightGrey
				: props.$active
				? props.theme.color.black
				: props.theme.color.light_primary};
		color: ${props =>
			props.$white && !props.$active
				? props.theme.color.grey
				: props.theme.color.white};
	}
	cursor: ${props => (props.$active ? 'pointer' : 'not-allowed')};
`;

export const PageWrapper = styled.div``;
export const PageContainer = styled.div`
	width: 90%;
	${MEDIA_QUERY.s} {
		width: 100%;
	}
	margin: 0 auto;
	display: flex;
	align-items: flex-start;
`;
