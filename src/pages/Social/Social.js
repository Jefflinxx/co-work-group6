import { useState } from "react";
import styled from "styled-components";

import imagetest from "./imagetest.png";
import heart from "./heart.png";
import follow from "./follow.png";
import save from "./save.png";
import ball from "./ball.png";
import rectangle from "./rectangle.png";
import time from "./time.png";
import search from "./search.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 412px) {
    background: #34393c;
  }
`;

const CenterWrapper = styled.div`
  width: 1200px;
  @media screen and (max-width: 1200px) {
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
  margin: 20px 0px;
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
  justify-content: space-between;
  margin-bottom: 20px;
  @media screen and (max-width: 412px) {
    display: none;
  }
`;

const SortSearchInput = styled.input`
  height: 34px;
  width: 200px;
  border: none;
  outline: none;
  margin-left: 20px;
  border-radius: 0px;
  padding: 6px 45px 6px 20px;
  border-bottom: solid 1px #979797;
  background-image: url(${search});
  background-size: 40px;
  background-position: 150px center;
  background-repeat: no-repeat;
  font-size: 20px;
  line-height: 24px;
  color: #8b572a;

  @media screen and (max-width: 470px) {
    width: 180px;
    background-position: 130px center;
  }
  @media screen and (max-width: 412px) {
    display: none;
    ${
      "" /* width: 0;
    border: none;
    position: fixed;
    right: 16px;
    background-size: 32px;
    background-position: right center; */
    }
  }

  &:focus {
    @media screen and (max-width: 412px) {
      display: none;
      ${
        "" /* width: calc(100% - 20px);
      border: solid 1px #979797; */
      }
    }
  }
`;

const SortDiv = styled.div`
  width: 100px;
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
    width: 100%;
    border: 1px solid #34393c;
  }
`;

const SortText = styled.p`
  width: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 412px) {
    color: #828282;
  }
`;

const SortHeartIcon = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 6px;

  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${heart});
  background-size: 32px 26px;
  @media screen and (max-width: 412px) {
  }
`;

const SortTimeIcon = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 50px;

  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${time});
  background-size: 42px 36px;
  @media screen and (max-width: 412px) {
  }
`;

const SortButton = styled.div`
  position: absolute;
  width: 50%;
  height: 38px;
  top: 0px;
  left: 0px;
  border-radius: 40px;
  z-index: 1;
  background: #f5f5f5;
  transform: ${(props) => {
    return props.toggle ? "translateX(49px)" : "translateX(0px)";
  }};
  transition: 0.4s;
  @media screen and (max-width: 412px) {
    background: #34393c;
    width: 50vw;
    height: 40px;
    top: -1px;
    transform: ${(props) => {
      return props.toggle ? "translateX(50vw)" : "translateX(0px)";
    }};
  }
`;
//手機sort
const SortPhoneWrapper = styled.div`
  display: none;

  @media screen and (max-width: 412px) {
    display: flex;
    align-items: center;
    height: 50px;
    background: #313538;
  }
`;

const Split = styled.div`
  height: 16px;
  border-left: 1px solid #828282;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    justify-content: space-around;
  }
`;

const Post = styled.div`
  width: 360px;
  height: 530px;
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
  width: 360px;
  height: 480px;
  @media screen and (max-width: 1199px) {
    width: 100%;
    height: auto;
  }
`;

const PostIconWrapper = styled.div`
  width: 360px;
  height: 50px;
  display: flex;
  position: relative;
  background: #34393c;
  @media screen and (max-width: 412px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const PostHeartIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${heart});
  background-size: 40px 34px;
  margin-left: 20px;
  @media screen and (max-width: 412px) {
    margin-left: 10px;
  }
`;

const PostIconNumber = styled.div`
  position: absolute;
  top: 21px;
  left: 64px;
  font-size: 18px;
  color: #f5f5f5f5;
  text-align: center;
  @media screen and (max-width: 412px) {
    left: 54px;
  }
`;

const PostFollowIcon = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 170px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${follow});
  background-size: 36px 32px;
  @media screen and (max-width: 412px) {
    margin-left: 238px;
  }
  @media screen and (max-width: 375px) {
    margin-left: 190px;
  }
`;

const PostSaveIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${save});
  background-size: 34px 30px;
`;

const Background = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.08);
  @media screen and (max-width: 412px) {
    display: none;
  }
`;

const ActivePost = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 101;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 412px) {
    display: none;
  }
`;

const ActiveUserDiv = styled.div`
  position: relative;
  top: ${(props) => props};
  top: 0px;
  width: 600px;
  height: 80px;

  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const ActiveUserImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;

  background: #d9d9d9;
`;

const ActiveUserText = styled.p`
  margin-left: 16px;
  color: #d9d9d9;
`;

const ActivePostImage = styled.img`
  position: relative;
  top: ${(props) => props};
  top: 0px;
  width: 600px;
  height: 750px;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const ActivePostIconWrapper = styled.div`
  width: 600px;
  height: 70px;
  display: flex;
  position: relative;
  background: #34393c;
  @media screen and (max-width: 412px) {
    width: 100%;
  }
`;

const ActivePostHeartIcon = styled.div`
  width: 70px;
  height: 70px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${heart});
  background-size: 40px 34px;
  margin-left: 0px;
  @media screen and (max-width: 412px) {
    margin-left: 10px;
  }
`;

const ActivePostIconNumber = styled.div`
  position: absolute;
  top: 30px;
  left: 56px;
  font-size: 18px;
  color: #f5f5f5f5;
  text-align: center;
  @media screen and (max-width: 412px) {
    left: 54px;
  }
`;

const ActivePostFollowIcon = styled.div`
  width: 70px;
  height: 70px;
  margin-left: 386px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${follow});
  background-size: 36px 32px;
  @media screen and (max-width: 412px) {
    margin-left: 238px;
  }
  @media screen and (max-width: 375px) {
    margin-left: 190px;
  }
`;

const ActivePostSaveIcon = styled.div`
  width: 70px;
  height: 70px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${save});
  background-size: 34px 30px;
`;

const TagDiv = styled.div`
  position: absolute;
  bottom: 122px;
  width: 600px;
  height: auto;
`;

const TagNameDiv = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  width: 580px;
  height: auto;
  display: flex;
  flex-wrap: wrap-reverse;
`;

const TagName = styled.div`
  padding: 2px 20px;
  margin: 4px;
  height: auto;
  background: rgba(255, 255, 255, 0.697);
  color: #34393c;
`;

const ProductNameDiv = styled.div`
  margin: 10px;
  width: 580px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const ProductName = styled.div`
  padding: 10px 40px;
  margin: 4px;
  height: auto;
  background: rgba(0, 0, 0, 0.428);
  color: #f5f5f5;
`;

const MobileTagDiv = styled.div`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    width: 100vw;
    height: auto;
  }
`;

const MobileTagNameDiv = styled.div`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    margin: 10px;
    margin-bottom: 20px;
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap-reverse;
  }
`;

const MobileTagName = styled.div`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    padding: 2px 20px;
    margin: 4px;
    height: auto;
    background: rgba(255, 255, 255, 0.697);
    color: #34393c;
  }
`;

const MobileProductNameDiv = styled.div`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    margin: 10px;
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
`;

const MobileProductName = styled.div`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    padding: 10px 40px;
    margin: 4px;
    height: auto;
    background: rgba(0, 0, 0, 0.428);
    color: #f5f5f5;
  }
`;

const MobileUserDiv = styled.div`
  display: none;
  position: relative;
  top: ${(props) => props};
  top: 0px;
  width: 600px;
  height: 80px;

  align-items: center;

  @media screen and (max-width: 412px) {
    display: flex;
    width: 100%;
    height: auto;
  }
`;

const MobileUserImage = styled.img`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 10px 0px 10px 4px;
    background: #d9d9d9;
  }
`;

const MobileUserText = styled.p`
  display: none;
  @media screen and (max-width: 412px) {
    display: block;
    margin-left: 16px;
    color: #d9d9d9;
  }
`;

function Social() {
  const [mode, setMode] = useState(true);
  const [sort, setSort] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);

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
          <SortSearchInput
            placeholder="搜尋貼文"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                //navigate(`/?keyword=${inputValue}`);
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <SortDiv
            onClick={() => {
              setSort(!sort);
            }}
          >
            <SortHeartIcon></SortHeartIcon>
            <SortTimeIcon></SortTimeIcon>
            <SortButton toggle={sort}></SortButton>
          </SortDiv>
        </SortWrapper>
        <SortPhoneWrapper>
          <SortText>愛心</SortText>
          <Split></Split>
          <SortText>時間</SortText>
        </SortPhoneWrapper>
        <PostWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
            return (
              <>
                <Post>
                  {/* 手機版 */}
                  <MobileUserDiv>
                    <MobileUserImage />
                    <MobileUserText>{"時尚教主"}</MobileUserText>
                  </MobileUserDiv>

                  <PostImage
                    src={imagetest}
                    onClick={() => {
                      if (window.innerWidth > 412) {
                        console.log("click");
                        setIsActive(true);
                      }
                    }}
                  />
                  {/* 收機版 */}
                  <MobileTagDiv>
                    <MobileProductNameDiv>
                      {[1].map(() => (
                        <MobileProductName>
                          {"超酷牛仔西裝外套"}
                        </MobileProductName>
                      ))}
                    </MobileProductNameDiv>
                    <MobileTagNameDiv>
                      {[1, 2, 3].map(() => (
                        <MobileTagName>{"好看"}</MobileTagName>
                      ))}
                    </MobileTagNameDiv>
                  </MobileTagDiv>

                  <PostIconWrapper>
                    <PostHeartIcon></PostHeartIcon>
                    <PostIconNumber>1234</PostIconNumber>
                    <PostFollowIcon></PostFollowIcon>
                    <PostSaveIcon></PostSaveIcon>
                  </PostIconWrapper>
                </Post>
                {/* pop up */}
                <Background isActive={isActive}></Background>
                <ActivePost
                  onClick={(e) => {
                    console.log("cancel");
                    setIsActive(false);
                  }}
                  isActive={isActive}
                >
                  <ActiveUserDiv>
                    <ActiveUserImage />
                    <ActiveUserText>{"時尚教主"}</ActiveUserText>
                  </ActiveUserDiv>
                  <ActivePostImage
                    src={imagetest}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("no cancel");
                    }}
                  />
                  <ActivePostIconWrapper>
                    <ActivePostHeartIcon></ActivePostHeartIcon>
                    <ActivePostIconNumber>1234</ActivePostIconNumber>
                    <ActivePostFollowIcon></ActivePostFollowIcon>
                    <ActivePostSaveIcon></ActivePostSaveIcon>
                  </ActivePostIconWrapper>
                  <TagDiv>
                    <ProductNameDiv>
                      {[1, 2].map(() => (
                        <ProductName>{"超酷牛仔西裝外套"}</ProductName>
                      ))}
                    </ProductNameDiv>
                    <TagNameDiv>
                      {[1, 2, 3, 4, 5].map(() => (
                        <TagName>{"好看"}</TagName>
                      ))}
                    </TagNameDiv>
                  </TagDiv>
                </ActivePost>
              </>
            );
          })}
        </PostWrapper>
      </CenterWrapper>
    </Wrapper>
  );
}

export default Social;
