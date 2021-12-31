import styled from "styled-components"
import { fontTheme, MEDIA_QUERY } from "../constants/style"


const FlowMobile = styled.li`
    margin: 1px 0;
    padding: 10px;
    border-left: 3px solid ${props => props.$active ? props.theme.color.black : props.theme.color.lightGrey};
    color: ${props => props.$active && props.theme.color.black};
`

const FlowContainer = styled.div`
    & ol {
        &:nth-child(1) {
            display: flex;
            justify-content: center;
            ${MEDIA_QUERY.m} {
                display: none;
            }
        }
        &:nth-child(2) {
            display: none;
            ${fontTheme.p}
            color: ${props => props.theme.color.lightGrey};
            padding: 10px 0;
            ${MEDIA_QUERY.m} {
                display: block;
            }
        }
    }
`

const FlowNode = styled.div`
    ${fontTheme.p};
    margin: 10px;
    background-color: ${props => props.theme.color.lightGrey};
    color: ${props => props.theme.color.white};
    min-width: 80px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    & > p {
        ${fontTheme.h3}
    }
`

const FlowText = styled.div`
    ${fontTheme.p}
    padding-right: 10px;
    color: ${props => props.theme.color.lightGrey};
    min-width: ${props => props.$fixed && '108px'};
    & > p {
        ${fontTheme.h4}
    }
`

const FlowContent = styled.li`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: relative;
    & + li::before {
        content: '>';
        position: absolute;
        left: -10px;
        ${fontTheme.h3}
        color: ${props => props.theme.color.lightGrey};
    }
    ${FlowNode} {
        background-color: ${props => props.$active && props.theme.color.black};
    }
    ${FlowText} {
        color: ${props => props.$active && props.theme.color.black};
    }
`

export const CheckoutFlow = ({step}) => {
    return (
        <FlowContainer>
            <ol>
                <FlowContent $active={step === 1}>
                    <FlowNode>
                        Step
                        <p>01</p>
                    </FlowNode>
                    <FlowText $fixed>
                        Check Order
                        <p>確認購買清單</p>
                    </FlowText>
                </FlowContent>
                <FlowContent $active={step === 2}>
                    <FlowNode>
                        Step
                        <p>02</p>
                    </FlowNode>
                    <FlowText $fixed>
                        Write the Add
                        <p>填寫付款及運送資料</p>
                    </FlowText>
                </FlowContent>
                <FlowContent $active={step === 3}>
                    <FlowNode>
                        Step
                        <p>03</p>
                    </FlowNode>
                    <FlowText>
                        Completed
                        <p>完成訂單</p>
                    </FlowText>
                </FlowContent>
            </ol>
            <ol>
                <FlowMobile $active={step === 1}>
                    STEP1. 確認購買訂單 Check Order
                </FlowMobile>
                <FlowMobile $active={step === 2}>
                    STEP2. 填寫付款及運送資料 Write the Add
                </FlowMobile>
                <FlowMobile $active={step === 3}>
                    STEP3. 完成訂單 Completed
                </FlowMobile>
            </ol>
        </FlowContainer>
    )
}