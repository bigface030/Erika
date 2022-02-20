import styled, { keyframes } from 'styled-components';

const spin_loader = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderBase = styled.div`
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	margin: auto;
	border: solid #f3f3f3;
	border-top-color: #aaa;
	border-radius: 50%;
	width: 10%;
	height: 10%;
	animation: ${spin_loader} 1s linear infinite;
`;

export const FullPageLoader = styled(LoaderBase)`
	position: fixed;
	border-width: 8px;
`;

export const ImgLoader = styled(LoaderBase)`
	position: absolute;
	border-width: 4px;
	width: 20px;
	height: 20px;
`;

const Mask = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
	background-color: ${props => props.theme.color.lightGrey}5;
`;

export const Loader = () => {
	return (
		<Mask>
			<FullPageLoader />
		</Mask>
	);
};
