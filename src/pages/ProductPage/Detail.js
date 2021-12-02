import styled from "styled-components"
import { MEDIA_QUERY, H4, P, Span } from "../../constants/style"
import useProduct from "../../hooks/useProduct";


const DetailContainer = styled.div`
  padding: 10px;
  ${MEDIA_QUERY.m} {
    width: 90%;
    margin: 0 auto;
  }
`
const DetailTag = styled.div`
  text-align: center;
  padding: 10px 0 20px;
`
const TagBtn = styled.button`
  margin: 5px;
  padding: 5px 15px;
  border-radius: .25em;
  border: 1px solid ${props => props.$checked ? props.theme.color.black : props.theme.color.lightGrey};
  transition: .4s;
  background-color: ${props => props.$checked ? props.theme.color.black : props.theme.color.white};
  & span {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.l};
    color: ${props => props.$checked ? props.theme.color.white : props.theme.color.black};
  }
  &:hover {
    background-color: ${props => props.theme.color.black};
    border-color: ${props => props.theme.color.black};
    & span {
      color: ${props => props.theme.color.white};
    }
    &::before {
      opacity: 1;
    }
  }
  position: relative;
  &::before {
    opacity: ${props => props.$checked ? 1 : 0};
    transition: .4s;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -8px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 8px solid ${props => props.theme.color.black};
  }
  position: relative;
  & label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
`

const DetailContent = styled.div`
  border: 1px solid #aaa;
  padding: 20px;
  & > input {
    display: none;
    &:checked + div {
      opacity: 1;
      position: relative;
      top: 0px;
      transition: opacity .5s;
    }
  }
  position: relative;
  & > div {
    z-index: -1;
    opacity: 0;
    position: absolute;
    top: -200px;
    margin: 10px;
  }
  ${MEDIA_QUERY.s} {
    padding: 0;
  }
`

const InfoContainer = styled.div`
  & h4 {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.xl};
    padding: 5px 0 10px;
  }
  & p {
    color: ${props => props.theme.color.grey};
    padding-bottom: 10px;
  }
`
const SizeContainer = styled.div`
  overflow: auto;
  & table {
    border-collapse: collapse;
  }
  & th, td {
    border: 1px solid #aaa;
    width: 150px;
    text-align: center;
    padding: 5px 0;
    & span {
      display: block;
    }
  }
  & th, td, span {
    font-size: ${props => props.theme.fontSize.bodyLarge};
    font-weight: ${props => props.theme.fontWeight.l};
    color: ${props => props.theme.color.black};
    line-height: 1.5em;
  }
`


export const Detail = ({product, group}) => {

    const { 
      isChecked,
      handleCheckedChange
    } = useProduct()
    
    const sizeMap = {
      Size_top: {
        sleeve_length: '袖長',
        body_length: '衣長',
        body_width: '胸寬'
      },
      Size_bottom: {
        waist: '腰圍',
        hip: '臀圍',
        rise: '褲檔',
        inseam: '褲內檔長'
      },
      Size_skirt: {
        waist: '腰圍',
        hip: '臀圍',
        length: '裙長'
      }
    }
    
    return (
        <DetailContainer>
          <DetailTag>
            <TagBtn $checked={isChecked}>
              <label htmlFor="detail_info" />
              <Span>商品詳情</Span>
            </TagBtn>
            <TagBtn $checked={!isChecked}>
              <label htmlFor="detail_size" />
              <Span>尺寸資訊</Span>
            </TagBtn>
          </DetailTag>
          <DetailContent>
            <input type="radio" name="detail" id="detail_info" checked={isChecked} onChange={handleCheckedChange} />
            {product && (
              <InfoContainer>
                <H4>材質</H4>
                <P>{product.product.material}</P>
                <H4>清洗方式</H4>
                <P>{product.product.washing}</P>
              </InfoContainer>
            )}
            <input type="radio" name="detail" id="detail_size" checked={!isChecked} onChange={handleCheckedChange} />
            <SizeContainer>
              {group && (group === 'Size_general' ? (
                <P>單一尺寸 One Size</P>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {Object.keys(sizeMap[group]).map(m => {
                        const measure = m
                          .split('_')
                          .map(word => word[0].toUpperCase() + word.slice(1))
                          .join(' ')
                        return (
                          <th>
                            <span>{measure}</span>
                            <span>{sizeMap[group][m]}</span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {product.product[`${group}s`].map(s => (
                      <tr>
                        <td>{s.size}</td>
                        {Object.keys(sizeMap[group]).map(m => (
                          <td>{s[m]}cm</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </SizeContainer>
          </DetailContent>
        </DetailContainer>
    )
}