import styled from "styled-components";

import imagetest from "./imagetest.png";
import heart from "./heart.png";
import follow from "./follow.png";
import save from "./save.png";
import ball from "./ball.png";
import rectangle from "./rectangle.png";

function Social() {
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
  `;

  const CenterWrapper = styled.div`
    width: 1486px;
  `;

  const ChangeModeWrapper = styled.div`
    height: 40px;

    display: flex;
    justify-content: flex-end;
    margin: 50px 0px;
  `;

  const ChangeModeDiv = styled.div`
    width: 100px;
    border: 1px solid black;
    border-radius: 40px;
    display: flex;
    justify-content: flex-end;
    background: #34393c;
    position: relative;
  `;

  const BallIcon = styled.div`
    width: 50px;
    height: 40px;
    position: relative;
    bottom: 1px;
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

    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${rectangle});
    background-size: 32px 32px;
  `;

  const ChangeModeButton = styled.div`
    width: 50px;
    cursor: pointer;
    border-radius: 40px;
    z-index: 1;
    background: #f5f5f5;
    border: 1px solid black;
  `;

  const SortWrapper = styled.div`
    height: 40px;
    border: 1px solid black;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 50px;
  `;

  const SortDiv = styled.div`
    width: 200px;
    border: 1px solid black;
    border-radius: 40px;
    display: flex;
    justify-content: flex-end;
  `;

  const SortButton = styled.div`
    width: 100px;
    border: 1px solid black;
    border-radius: 40px;
    z-index: 1;
  `;

  const PostWrapper = styled.div`
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;

  const Post = styled.div`
    width: 480px;
    height: 690px;
    border-radius: 40px;
    overflow: hidden;

    background: #34393c;
    margin-bottom: 80px;
  `;

  const PostImage = styled.img`
    width: 480px;
    height: 600px;
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

  return (
    <Wrapper>
      <CenterWrapper>
        <ChangeModeWrapper>
          <ChangeModeDiv>
            <BallIcon></BallIcon>
            <RectangleIcon></RectangleIcon>
            <ChangeModeButton></ChangeModeButton>
          </ChangeModeDiv>
        </ChangeModeWrapper>
        <SortWrapper>
          <SortDiv>
            <SortButton></SortButton>
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
