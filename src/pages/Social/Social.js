import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { io } from "socket.io-client";
import { useNavigate, useSearchParams } from "react-router-dom";

import imagetest from "./imagetest.png";
import heart from "./heart.png";
import activeHeart from "./heart-active.png";
import follow from "./follow.png";
import activeFollow from "./follow-active.png";
import save from "./save.png";
import activeSave from "./save-active.png";
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
  right: 0px;

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
  left: 0px;

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
  left: 50px;

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
  left: 6px;

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
  object-fit: cover;

  @media screen and (max-width: 1199px) {
    width: 100%;
    height: 480px;
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
  background-image: ${(props) => {
    //console.log(props.hearters.includes(props.uid));
    //console.log(props.hearters);
    //console.log(props.uid);
    return props.hearters.includes(props.uid)
      ? `url(${activeHeart})`
      : `url(${heart})`;
  }};
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

  background-image: ${(props) => {
    //console.log(props.followers);
    //console.log(props.uid);
    //console.log(props.followers.includes(props.uid));
    return props.followers.includes(props.uid)
      ? `url(${activeFollow})`
      : `url(${follow})`;
  }};
  background-size: ${(props) => {
    return props.followers.includes(props.uid) ? `40px 40px` : `36px 32px`;
  }};
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
  background-image: ${(props) => {
    //console.log(props.followers);
    //console.log(props.uid);
    //console.log(props.savers.includes(props.postId));
    return props.savers.includes(props.uid)
      ? `url(${activeSave})`
      : `url(${save})`;
  }};
  background-size: ${(props) => {
    return props.savers.includes(props.uid) ? `34px 34px` : `34px 30px`;
  }};
`;

const ActiveBackground = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
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
  object-fit: cover;
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
  background-image: ${(props) => {
    return props.hearters?.includes(props.uid)
      ? `url(${activeHeart})`
      : `url(${heart})`;
  }};
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
  background-image: ${(props) => {
    return props.followers?.includes(props.uid)
      ? `url(${activeFollow})`
      : `url(${follow})`;
  }};
  background-size: ${(props) => {
    return props.followers?.includes(props.uid) ? `40px 40px` : `36px 32px`;
  }};
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
  background-image: ${(props) => {
    return props.savers?.includes(props.uid)
      ? `url(${activeSave})`
      : `url(${save})`;
  }};
  background-size: 34px 30px;
`;

const TagDiv = styled.div`
  position: relative;
  bottom: 200px;
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
  cursor: default;
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
  cursor: pointer;
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
  cursor: default;
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
  cursor: pointer;
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

const MoreInfoDiv = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreInfo = styled.p`
  font-size: 32px;
`;

const AnimateDiv = styled.div`
  display: ${(props) => {
    return props.$mode ? "none" : "block";
  }};
  overflow: hidden;
`;

const spin = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
    transform: translate3d(-9px, -9px, 570px);
  }
`;

const AnimateImg = styled.img``;

const AnimateWrapper = styled.div`
  position: fixed;
  top: 600px;
  left: 50%;
  z-index: 222;
  -moz-perspective: 500px;
  -webkit-perspective: 500px;
  perspective: 500px;

  ${AnimateImg} {
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 1px;
    opacity: 0;
    background: rgba(255, 255, 255, 0.5);
    animation-name: ${spin};
    animation-duration: 16s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  ${AnimateImg}:nth-child(1) {
    transform: rotate(60deg) translate3d(240px, 0, 0);
    animation-delay: 1.33333s;
  }
  ${AnimateImg}:nth-child(2) {
    transform: rotate(120deg) translate3d(240px, 0, 0);
    animation-delay: 2.66667s;
  }
  ${AnimateImg}:nth-child(3) {
    transform: rotate(180deg) translate3d(240px, 0, 0);
    animation-delay: 4s;
  }
  ${AnimateImg}:nth-child(4) {
    transform: rotate(240deg) translate3d(240px, 0, 0);
    animation-delay: 5.33333s;
  }
  ${AnimateImg}:nth-child(5) {
    transform: rotate(300deg) translate3d(240px, 0, 0);
    animation-delay: 6.66667s;
  }
  ${AnimateImg}:nth-child(6) {
    transform: rotate(360deg) translate3d(240px, 0, 0);
    animation-delay: 8s;
  }
  ${AnimateImg}:nth-child(7) {
    transform: rotate(420deg) translate3d(240px, 0, 0);
    animation-delay: 9.33333s;
  }
  ${AnimateImg}:nth-child(8) {
    transform: rotate(480deg) translate3d(240px, 0, 0);
    animation-delay: 10.66667s;
  }
  ${AnimateImg}:nth-child(9) {
    transform: rotate(540deg) translate3d(240px, 0, 0);
    animation-delay: 12s;
  }
  ${AnimateImg}:nth-child(10) {
    transform: rotate(600deg) translate3d(240px, 0, 0);
    animation-delay: 13.33333s;
  }
  ${AnimateImg}:nth-child(11) {
    transform: rotate(660deg) translate3d(240px, 0, 0);
    animation-delay: 14.66667s;
  }
  ${AnimateImg}:nth-child(12) {
    transform: rotate(720deg) translate3d(240px, 0, 0);
    animation-delay: 16s;
  }
`;

function Social() {
  const [mode, setMode] = useState(true);
  const [sort, setSort] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [postData, setPostData] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const [activePostPicIndex, setActivePostPicIndex] = useState(0);
  const [userId, setUserId] = useState("");
  // const [isHeartActive, setIsHeartActive] = useState(false);
  const [heartActiveList, setHeartActiveList] = useState([]);
  // const [activePostId, setActivePostId] = useState(null);
  const socket = useRef(null);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const postKeyword = searchParams.get("postKeyword");

  const getPost = async () => {
    const response = await fetch(
      sort
        ? "https://hazlin.work/api/1.0/posts?sorting=time"
        : "https://hazlin.work/api/1.0/posts?sorting=hearts",
      {
        headers: {
          Authorization: ` Bearer ${JSON.parse(localStorage.jwtToken).token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("getPost成功");
    } else if (response.status === 403) {
      alert("帳號有誤，請確實登入");
    }
    const a = await response.json();
    setPostData(a);
    setUserId(a.uid);
  };

  const getSearch = async (input) => {
    const response = await fetch(
      sort
        ? `https://hazlin.work/api/1.0/posts/search?query_string=${input}&sorting=time`
        : `https://hazlin.work/api/1.0/posts/search?query_string=${input}&sorting=hearts`,
      {
        headers: {
          Authorization: ` Bearer ${JSON.parse(localStorage.jwtToken).token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("getPost成功");
    } else if (response.status === 403) {
      alert("帳號有誤，請確實登入");
    }
    const a = await response.json();
    setPostData(a);
    setUserId(a.uid);
  };

  console.log(postData);

  const postHeart = async (postId) => {
    const response = await fetch("https://hazlin.work/api/1.0/posts/heart", {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.jwtToken).token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
      method: "POST",
    });

    if (response.status === 200) {
      console.log("成功");
    } else if (response.status === 403) {
      alert("帳號有誤，請確實登入");
    }
    const message = await response.json();
    console.log(message);

    setRenderCount(renderCount + 1);
  };

  const postFollow = async (postId, followId) => {
    const response = await fetch("https://hazlin.work/api/1.0/posts/follow", {
      headers: {
        Authorization: ` Bearer ${JSON.parse(localStorage.jwtToken).token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId, followed_id: followId }),
      method: "PATCH",
    });

    if (response.status === 200) {
      console.log("postFollow成功");
    } else if (response.status === 403) {
      alert("帳號有誤，請確實登入");
    }
    const message = await response.json();
    console.log(message);
    setRenderCount(renderCount + 1);
  };

  const postSaver = async (postId, uid) => {
    const response = await fetch(
      `https://hazlin.work/api/1.0/posts/save/${postId}`,
      {
        headers: {
          Authorization: ` Bearer ${JSON.parse(localStorage.jwtToken).token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId, user_id: uid }),
        method: "PATCH",
      }
    );

    if (response.status === 200) {
      console.log("postSaver成功");
    } else if (response.status === 403) {
      alert("帳號有誤，請確實登入");
    }
    const message = await response.json();
    console.log(message);
    setRenderCount(renderCount + 1);
  };
  console.log("postkeyword", postKeyword);

  useEffect(() => {
    console.log(postKeyword);
    if (!postKeyword) {
      setInputValue("");
    }
    if (localStorage.jwtToken) {
      if (postKeyword) {
        getSearch(postKeyword);
      } else {
        getPost();
      }
    }
  }, [renderCount, postKeyword, sort]);

  useEffect(() => {
    if (localStorage.jwtToken) {
      socket.current = io.connect("https://hazlin.work/", {
        extraHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.jwtToken).token}`,
        },
        transports: ["websocket"],
      });
    }

    // message from server
    // socket.current.on("liked", (msg) => {
    //   console.log("msg: ", msg);
    // });
    // notification from server
    // socket.current.on("followed", (msg) => {
    //   console.log("msg: ", msg);
    // });
  }, [socket]);

  return (
    <>
      {postData && (
        <>
          {/* 動畫模式 */}
          <AnimateDiv $mode={mode}>
            <AnimateWrapper>
              {postData.list.slice(0, 13).map((i, index) => {
                return <AnimateImg key={index} src={i.postPic}></AnimateImg>;
              })}
            </AnimateWrapper>
          </AnimateDiv>

          {/* 一般模式 */}
          <Wrapper>
            <CenterWrapper>
              <ChangeModeWrapper>
                <ChangeModeDiv
                  onClick={() => {
                    console.log("click");
                    setMode(!mode);
                  }}
                >
                  <RectangleIcon></RectangleIcon>
                  <BallIcon></BallIcon>

                  <ChangeModeButton toggle={mode}></ChangeModeButton>
                </ChangeModeDiv>
              </ChangeModeWrapper>
              <SortWrapper>
                <SortSearchInput
                  placeholder="搜尋貼文"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      navigate(
                        sort
                          ? `?postKeyword=${inputValue}&sort=time`
                          : `?postKeyword=${inputValue}&sort=hearts`
                      );
                      getSearch(inputValue);
                    }
                  }}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
                <SortDiv
                  onClick={() => {
                    setSort(!sort);
                    if (postKeyword === null || postKeyword == "") {
                      navigate(sort ? `?sort=hearts` : `?sort=time`);
                    } else {
                      navigate(
                        sort
                          ? `?postKeyword=${postKeyword}&sort=hearts`
                          : `?postKeyword=${postKeyword}&sort=time`
                      );
                    }

                    console.log(sort);
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
                {postData.list.map((i, index) => {
                  return (
                    <Post key={i.postId}>
                      {/* 手機版 */}
                      <MobileUserDiv>
                        <MobileUserImage src={i.user_picture} />
                        <MobileUserText>{i.uname}</MobileUserText>
                      </MobileUserDiv>

                      <PostImage
                        src={i.postPic}
                        onClick={() => {
                          if (window.innerWidth > 412) {
                            console.log("click");
                            setIsActive(true);
                            setActivePostPicIndex(index);
                          }
                        }}
                      />
                      {/* 收機版 */}
                      <MobileTagDiv
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MobileProductNameDiv>
                          {i.products.map((i) => (
                            <MobileProductName
                              key={i.pid}
                              onClick={() => {
                                navigate(`../products/${i.pid}`);
                              }}
                            >
                              {i.pName}
                            </MobileProductName>
                          ))}
                        </MobileProductNameDiv>
                        <MobileTagNameDiv>
                          {i.tags.map((i, index) => (
                            <MobileTagName key={index}>{i}</MobileTagName>
                          ))}
                        </MobileTagNameDiv>
                      </MobileTagDiv>

                      <PostIconWrapper
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <PostHeartIcon
                          uid={userId}
                          hearters={i.hearters}
                          onClick={() => {
                            postHeart(i.postId);
                            if (!i.hearters.includes(userId)) {
                              console.log("socket click heart!");
                              socket.current.emit("like", {
                                post_id: i.postId,
                                hearted_user_id: i.uid,
                              });
                            }
                          }}
                        ></PostHeartIcon>
                        <PostIconNumber>{i.hearts}</PostIconNumber>
                        <PostFollowIcon
                          uid={userId}
                          followers={i.followers}
                          onClick={() => {
                            postFollow(i.postId, i.uid);
                            if (!i.followers.includes(userId)) {
                              console.log("socket follow");
                              socket.current.emit("follow", {
                                followed_id: i.uid,
                              });
                            }
                          }}
                        ></PostFollowIcon>
                        <PostSaveIcon
                          uid={userId}
                          savers={i.savers}
                          onClick={() => {
                            console.log("save");
                            postSaver(i.postId, i.uid);
                          }}
                        ></PostSaveIcon>
                      </PostIconWrapper>
                    </Post>
                  );
                })}
                {/* pop up */}
                <ActiveBackground isActive={isActive}></ActiveBackground>
                <ActivePost
                  onClick={(e) => {
                    console.log("cancel");
                    setIsActive(false);
                  }}
                  isActive={isActive}
                >
                  <ActiveUserDiv>
                    <ActiveUserImage
                      src={postData.list[activePostPicIndex]?.user_picture}
                    />
                    <ActiveUserText>
                      {postData.list[activePostPicIndex]?.uname}
                    </ActiveUserText>
                  </ActiveUserDiv>
                  <ActivePostImage
                    src={postData.list[activePostPicIndex]?.postPic}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("no cancel");
                    }}
                  />
                  <ActivePostIconWrapper
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ActivePostHeartIcon
                      uid={userId}
                      hearters={postData.list[activePostPicIndex]?.hearters}
                      onClick={(e) => {
                        e.stopPropagation();
                        postHeart(postData.list[activePostPicIndex]?.postId);
                        if (
                          !postData.list[activePostPicIndex]?.hearters.includes(
                            userId
                          )
                        ) {
                          socket.current.emit("like", {
                            post_id: postData.list[activePostPicIndex].postId,
                            hearted_user_id: userId,
                          });
                        }
                      }}
                    ></ActivePostHeartIcon>
                    <ActivePostIconNumber>
                      {postData.list[activePostPicIndex]?.hearts}
                    </ActivePostIconNumber>
                    <ActivePostFollowIcon
                      uid={userId}
                      followers={postData.list[activePostPicIndex]?.followers}
                      onClick={(e) => {
                        e.stopPropagation();
                        postFollow(
                          postData.list[activePostPicIndex]?.postId,
                          postData.list[activePostPicIndex]?.uid
                        );
                        socket.current.emit("follow", {
                          followed_id: userId,
                        });
                      }}
                    ></ActivePostFollowIcon>
                    <ActivePostSaveIcon
                      postId={postData.list[activePostPicIndex]?.postId}
                      savers={postData.list[activePostPicIndex]?.savers}
                      onClick={(e) => {
                        e.stopPropagation();
                        postSaver(
                          postData.list[activePostPicIndex]?.postId,
                          postData.list[activePostPicIndex]?.uid
                        );
                      }}
                    ></ActivePostSaveIcon>
                  </ActivePostIconWrapper>
                  <TagDiv
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ProductNameDiv>
                      {postData.list[activePostPicIndex]?.products.map((i) => (
                        <ProductName
                          key={i.pid}
                          onClick={() => {
                            navigate(`../products/${i.pid}`);
                          }}
                        >
                          {i.pName}
                        </ProductName>
                      ))}
                    </ProductNameDiv>
                    <TagNameDiv>
                      {postData.list[activePostPicIndex]?.tags.map(
                        (i, index) => (
                          <TagName key={index}>{i}</TagName>
                        )
                      )}
                    </TagNameDiv>
                  </TagDiv>
                </ActivePost>
              </PostWrapper>
            </CenterWrapper>
          </Wrapper>
        </>
      )}
      {!localStorage.jwtToken && (
        <Wrapper>
          <MoreInfoDiv>
            <MoreInfo>請先登入已獲取更多資訊</MoreInfo>
          </MoreInfoDiv>
        </Wrapper>
      )}
    </>
  );
}

export default Social;
