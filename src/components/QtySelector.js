import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Qty = styled.div`
	width: 60px;
	height: 40px;
	position: relative;
`;

const QtyInput = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding-left: 5px;
	height: 100%;
	outline: 0;
	border: 1px solid ${props => props.theme.color.lightGrey};
`;

const QtyDiv = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
`;

const QtyBtn = styled.button`
	box-sizing: content-box;
	height: 18.5px;
	border: 1px solid ${props => props.theme.color.lightGrey};
	transition: 0.25s;
	background-color: ${props => props.theme.color.white};
	& + button {
		margin-top: -1px;
	}
	& svg {
		display: block;
		margin: auto;
		color: ${props => props.theme.color.grey};
		font-size: ${props => props.theme.fontSize.bodySmall};
	}
	&:hover {
		background-color: ${props => props.theme.color.light_primary};
	}
`;

export const QtySelector = ({ qty, handleQtyChange, handleBtnClick }) => {
	return (
		<Qty>
			<QtyInput
				type="number"
				value={qty}
				min={1}
				onChange={handleQtyChange}
			/>
			<QtyDiv>
				<QtyBtn onClick={() => handleBtnClick('inc')}>
					<FontAwesomeIcon
						icon={faChevronDown}
						transform={{ rotate: 180 }}
					/>
				</QtyBtn>
				<QtyBtn onClick={() => handleBtnClick('dec')}>
					<FontAwesomeIcon
						icon={faChevronDown}
						transform={{ rotate: 0 }}
					/>
				</QtyBtn>
			</QtyDiv>
		</Qty>
	);
};
