import styled from "styled-components";
import { useState, useEffect } from "react";
import { getFeedImages } from "../webAPI/productAPI";
import { MEDIA_QUERY } from "../constants/style"

const FeedWrapper = styled.div`
`
const FeedContainer = styled.div`
  padding: 40px 0 0;
  display: flex;
  overflow: hidden;
  & div {
    width: calc(100%/6);
    ${MEDIA_QUERY.m} {
      width: calc(100%/4);
    }
    ${MEDIA_QUERY.s} {
      width: calc(100%/3);
    }
    ${MEDIA_QUERY.xs} {
      width: calc(100%/2);
    }
    flex-shrink: 0;
    & img {
      width: 100%;
      height: 100%;
    }
  }
`

export const Feed = () => {

  const [feeds, setFeeds] = useState()
  useEffect(() => {
    getFeedImages().then(data => {
      setFeeds(
        data.map(img => (
          {id: img.id, desc: img.description, url: img.urls.small}
        ))
      )
    })
  }, [])

  return (
    <FeedWrapper>
      <FeedContainer>
        {
          feeds && feeds.map(feed => (
            <div key={feed.id}>
              <a target="_blank" rel="noreferrer" href={feed.url}>
                <img src={feed.url} alt={feed.desc}/>
              </a>
            </div>
          ))
        }
      </FeedContainer>
    </FeedWrapper>
  );
}