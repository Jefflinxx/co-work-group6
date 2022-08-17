import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import imagetest from './imagetest.png'
import heart from './heart.png'
import saveActive from './save-active.png'
import profile from './profile.jpg'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`
const PhotoWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
`
const Divide = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const FollowPerson = styled.div`
  width: 15%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-image: url(${profile});
  background-repeat: no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 24px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;

  color: white;

  &:hover {
    aspect-ratio: 1/1;
    border-radius: 50%;
    transition: all 0.3s;
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
`
const TextTitle = styled.div`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`
const TextMore = styled(TextTitle)`
  font-size: 18px;
  width: 150px;
  border: 1px solid black;
  margin: 0 auto;
  padding: 12px;
  margin-bottom: 20px;
  cursor: pointer;
`
const PostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    justify-content: space-around;
  }
`
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
`
const PostImage = styled.img`
  width: 360px;
  height: 480px;
  @media screen and (max-width: 1199px) {
    width: 100%;
    height: auto;
  }
`
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
`
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
`
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
`
const PostSaveIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${saveActive});
  background-size: 34px 30px;

  position: absolute;
  right: 20px;
`

function FollowingList() {
  const [isClick, setIsClick] = useState(false)
  const [postIsOpen, setPostIsopen] = useState(false)
  const [postData, setPostData] = useState([])

  // useEffect(() => {
  //   async function showSavedPost() {

  //     const response = await fetch(`https://hazlin.work/api/1.0/user/saved`, {
  //       headers: new Headers({
  //         Authorization: `Bearer ${faketoken}`,
  //       }),
  //     })

  //     if (response.status === 200) {
  //       // console.log(await response.json())

  //       const respostData = await response.json()
  //       // setPostData(await respostData)
  //       return await response.json()
  //     } else {
  //       console.log((error) => console.log('error', error))
  //     }
  //   }
  //   showSavedPost()
  // }, [])

  async function getsavedPost() {
    setIsClick((current) => !current)
    setPostIsopen((prevCheck) => !prevCheck)
    let savedPost = await postData
    let savedPostInfo = await savedPost.posts
    console.log(await savedPostInfo)
    if (savedPostInfo > 0) {
      console.log(savedPostInfo[1].postPic)
    }
  }

  return (
    <>
      <Wrapper>
        <PhotoWrapper>
          <TextTitle>追蹤的潮流教主</TextTitle>
          <Divide>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
            <FollowPerson></FollowPerson>
          </Divide>
        </PhotoWrapper>
        <TextTitle>我收藏的潮流貼文</TextTitle>
        <TextMore
          onClick={getsavedPost}
          style={{
            backgroundColor: isClick ? '#bc9272' : 'white',
            border: isClick ? '#bc9272' : 'black',
            color: isClick ? 'white' : '#bc9272',
          }}
        >
          查看我的收藏
        </TextMore>
        {postIsOpen && (
          <Divide>
            <PostWrapper>
              <Post>
                <PostImage
                  src={'https://hazlin.work/assets/KOL/0a5d4f5d.jpeg'}
                  // onClick={() => {
                  //   if (window.innerWidth > 412) {
                  //     console.log("click");
                  //     setIsActive(true);
                  //   }
                  // }}
                />
                <PostIconWrapper>
                  <PostHeartIcon></PostHeartIcon>
                  <PostIconNumber>1234</PostIconNumber>
                  <PostSaveIcon></PostSaveIcon>
                </PostIconWrapper>
              </Post>
            </PostWrapper>
          </Divide>
        )}
      </Wrapper>
    </>
  )
}
export default FollowingList
