import { useState } from "react"
import styled, { keyframes } from "styled-components";

const spin_loader = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #aaa;
  border-radius: 50%;
  width: 10%;
  height: 10%;
  animation: ${spin_loader} 1s linear infinite;
`

export const Img = ({image}) => {

    const [isLoading, setIsLoading] = useState(true)
  
    const handleImgLoad = () => {
        setIsLoading(false)
    }
  
    return (
        <>
            {isLoading && (
                <Loader />
            )}
            <img src={image.src} alt={image.alt} onLoad={handleImgLoad}/>
        </>
    )
}
