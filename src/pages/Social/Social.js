import { useState } from "react";
import styled from "styled-components";

import imagetest from "./imagetest.png";
import heart from "./heart.png";
import follow from "./follow.png";
import save from "./save.png";
import ball from "./ball.png";
import rectangle from "./rectangle.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 412px) {
    background: #34393c;
  }
`;

const CenterWrapper = styled.div`
  width: 1486px;
  @media screen and (max-width: 1549px) {
    margin-bottom: 0px;
    width: calc(100% - 100px);
    height: auto;
  }
  @media screen and (max-width: 412px) {
    width: 100%;
  }
`;

const ChangeModeWrapper = styled.div`
  height: 40px;

  display: flex;
  justify-content: flex-end;
  margin: 50px 0px;
  @media screen and (max-width: 412px) {
    display: none;
  }
`;

const ChangeModeDiv = styled.div`
  width: 100px;
  border: 1px solid black;
  border-radius: 40px;
  cursor: pointer;
  background: #34393c;
  position: relative;
`;

const BallIcon = styled.div`
  width: 50px;
  height: 40px;
  position: absolute;
  top: -1px;
  left: 0px;

  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${ball});
  background-size: 30px 30px;
`;

const RectangleIcon = styled.div`
  position: absolute;
  top: -1px;
  width: 50px;
  height: 40px;
  right: 0px;

  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${rectangle});
  background-size: 32px 32px;
`;

const ChangeModeButton = styled.div`
  position: absolute;
  width: 50px;
  height: 38px;
  top: 0px;
  border-radius: 40px;
  z-index: 1;
  background: #f5f5f5;
  border: 1px solid black;
  transform: ${(props) => {
    return props.toggle ? "translateX(50px)" : "translateX(0px)";
  }};
  transition: 0.4s;
`;

const SortWrapper = styled.div`
  height: 40px;

  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  @media screen and (max-width: 412px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const SortDiv = styled.div`
  width: 200px;
  border: 1px solid black;
  border-radius: 40px;
  cursor: pointer;
  background: #34393c;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  @media screen and (max-width: 412px) {
    border: 1px solid #34393c;
  }
`;

const SortText = styled.p``;

const SortButton = styled.div`
  position: absolute;
  width: 100px;
  height: 38px;
  top: -1px;
  left: 0px;
  border-radius: 40px;
  z-index: 1;
  background: #f5f5f5;
  transform: ${(props) => {
    return props.toggle ? "translateX(100px)" : "translateX(0px)";
  }};
  transition: 0.4s;
  @media screen and (max-width: 412px) {
  }
`;

const PostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1549px) {
    justify-content: space-around;
  }
`;

const Post = styled.div`
  width: 480px;
  height: 690px;
  border-radius: 40px;
  overflow: hidden;

  background: #34393c;
  margin-bottom: 80px;

  @media screen and (max-width: 1279px) {
    height: auto;
  }
  @media screen and (max-width: 412px) {
    width: 100%;
    height: auto;
    border-radius: 0px;
    margin-bottom: 0px;
  }
`;

const PostImage = styled.img`
  width: 480px;
  height: 600px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    height: auto;
  }
`;

const PostIconWrapper = styled.div`
  width: 480px;
  height: 90px;
  display: flex;
  position: relative;
`;

const PostHeartIcon = styled.div`
  width: 90px;
  height: 90px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${heart});
`;

const PostIconNumber = styled.div`
  position: absolute;
  top: 45px;
  left: 75px;
  font-size: 20px;
  color: #f5f5f5f5;
  text-align: center;
`;

const PostFollowIcon = styled.div`
  width: 90px;
  height: 90px;
  margin-left: 240px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${follow});
`;

const PostSaveIcon = styled.div`
  width: 90px;
  height: 90px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${save});
`;

function Social() {
  const [mode, setMode] = useState(true);
  const [sort, setSort] = useState(true);
  console.log(mode);

  return (
    <Wrapper>
      <CenterWrapper>
        <ChangeModeWrapper>
          <ChangeModeDiv
            onClick={() => {
              console.log("click");
              setMode(!mode);
            }}
          >
            <BallIcon></BallIcon>
            <RectangleIcon></RectangleIcon>
            <ChangeModeButton toggle={mode}></ChangeModeButton>
          </ChangeModeDiv>
        </ChangeModeWrapper>
        <SortWrapper>
          <SortDiv
            onClick={() => {
              setSort(!sort);
            }}
          >
            <SortText>愛心&emsp; &emsp;&emsp; 時間</SortText>
            <SortButton toggle={sort}></SortButton>
          </SortDiv>
        </SortWrapper>
        <PostWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
            return (
              <Post>
                <PostImage src={imagetest} />
                <PostIconWrapper>
                  <PostHeartIcon></PostHeartIcon>
                  <PostIconNumber>1234</PostIconNumber>
                  <PostFollowIcon></PostFollowIcon>
                  <PostSaveIcon></PostSaveIcon>
                </PostIconWrapper>
              </Post>
            );
          })}
        </PostWrapper>
      </CenterWrapper>
    </Wrapper>
  );
}

export default Social;
