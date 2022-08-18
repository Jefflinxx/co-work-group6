import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
const Divide = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const FollowPerson = styled.a`
  width: 15%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-image: url(${(props) => props.$backgroundImageUrl});
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
  cursor: pointer;

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
  font-size: 28x;
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-bottom: 18px;
  }
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
    margin-bottom: 12px;
  }
`
const PostImage = styled.img`
  width: 360px;
  height: 480px;
  object-fit: cover;
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
  const [getUserProfile, setGetUserProfile] = useState(
    JSON.parse(window.localStorage.getItem('jwtToken')) || [],
  )
  const [followerData, setFollowerData] = useState()
  const [savedPostData, setSavedPostData] = useState()

  let jwtToken = window.localStorage.getItem('jwtToken')
  let navigate = useNavigate()

  useEffect(() => {
    if (jwtToken) {
      getfollowed()
      getsavedPost()
    }
    return
  }, [])

  async function getfollowed() {
    const response = await fetch(`https://hazlin.work/api/1.0/user/followed`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      // console.log(await response.json())
      // console.log(200)
      const savedFollower = await response.json()
      setFollowerData(savedFollower)
      if (setFollowerData.length === 0) {
        console.log('200 none')
        alert('尚未追蹤教主們，你落後了')
      } else if (setFollowerData.length !== 0) {
        console.log('200 有收藏')
        console.log(followerData)
      }
    }
  }
  console.log(followerData)

  async function getsavedPost() {
    const response = await fetch(`https://hazlin.work/api/1.0/user/saved`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      // console.log(await response.json())
      // console.log(200)
      const savedPost = await response.json()
      setSavedPostData(savedPost)
      if (savedPostData.length === 0) {
        // console.log('200 none')
        alert('尚未追蹤教主們，你落後了')
      } else if (savedPostData.length !== 0) {
        setIsClick((current) => !current)
        setPostIsopen((prevCheck) => !prevCheck)
        // console.log('200 有收藏')
        // console.log(savedPostData)
      }
    }
  }

  console.log(savedPostData)
  return (
    <>
      <Wrapper>
        <PhotoWrapper>
          <TextTitle onClick={getfollowed}>追蹤的潮流教主</TextTitle>
          <Divide>
            {followerData &&
              followerData.map((item, index) => {
                return (
                  <FollowPerson
                    key={index}
                    $backgroundImageUrl={item.user_picture}
                    onClick={() => {
                      navigate(
                        `../social/?postKeyword=${item.user_id}&sort=time`,
                      )
                    }}
                  >
                    {item.user_name}
                  </FollowPerson>
                )
              })}
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
        <PostWrapper>
          {savedPostData && postIsOpen
            ? savedPostData.map((item, id) => {
                return (
                  <Post key={id}>
                    <PostImage src={item.posts.postPic} />
                    <PostIconWrapper>
                      <PostHeartIcon></PostHeartIcon>
                      <PostIconNumber>{item.posts.hearts}</PostIconNumber>
                    </PostIconWrapper>
                  </Post>
                )
              })
            : null}
        </PostWrapper>
      </Wrapper>
    </>
  )
}
export default FollowingList
