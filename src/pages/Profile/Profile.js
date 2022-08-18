import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import main from './main.png'
import facebook from './facebook.png'
import Person from './Person.png'
import Mail from './Mail.png'
import Password from './Password.png'
import LogoPic from './logo.png'
import Popup from 'reactjs-popup'
import Member from '../Member/Member'

import api from '../../utils/api'
import getJwtToken from '../../utils/getJwtToken'
import fb from '../../utils/fb'

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  margin: 0 auto;
  max-width: 1160px;
  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }
`
const MemberWrapper = styled.div`
  padding: 60px 20px;
  margin: 0 auto;
  max-width: 1160px;
  @media screen and (max-width: 767px) {
    padding: 40px 20px;
  }
`
const Divide = styled.div`
  display: flex;
`

const BtnDivide = styled(Divide)`
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
  }
`
const MemberDivide = styled(Divide)`
  margin: 0 auto;
  max-width: 1160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`
const PhotoDivide = styled(Divide)`
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    margin-bottom: 12px;
  }
`
const LoginDivide = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`
const Title = styled.div`
  margin-bottom: 32px;
  font-size: 36px;
  font-weight: bold;

  @media screen and (max-width: 1279px) {
    margin-bottom: 20px;
    font-size: 24px;
  }
`
const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-space: 2px;
`
const MainLogin = styled.div`
  border: 1px solid #3f3a3a;
  width: 600px;
  height: auto;
  padding: 30px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 767px) {
    width: calc(100vw - 20px);
  }
`
const HotImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`
const HotImageList = styled.img`
  width: calc(33% - 12px);
  aspect-ratio: 0.6/1;
  background-image: url(${main});
  background-size: cover;
`
const SubTitle = styled(Title)`
  font-size: 24px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::before {
    content: '';
    width: 30%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #3f3a3a;
  }
  &::after {
    content: '';
    width: 30%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #3f3a3a;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
    &::before {
      width: 20%;
    }
    &::after {
      width: 20%;
    }
  }
`
const Btn = styled.button`
  width: 250px;
  brder-radius: 3px;
  background-color: #1877f2;
  padding: 16px;
  padding-left: 50px;
  letter-spacing: 2px;
  color: white;
  font-size: 16px;

  border: 1px solid #1877f2;
  cursor: pointer;
  margin-bottom: 36px;

  background-image: url(${facebook});
  background-repeat: no-repeat;
  background-position: 10px center;
`
const BtnMember = styled(Btn)`
  background-color: white;
  color: #3f3a3a;
  border: 1px solid #3f3a3a;
  border-radius: 12px;
  width: 220px;

  font-size: 20px;
  text-align: center;
  font-weight: bold;
  background-image: none;
  padding-left: 16px;
  transition: all 0.5s;
  &:hover {
    background-color: #8b572a;
    color: white;
    border: 1px solid #8b572a;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 16px;
  }
`
const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: -30px;

  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    background-color: black;
    color: white;
  }
  @media screen and (max-width: 767px) {
    right: 10px;
    top: 10px;
  }
`
const CheckOutBtn = styled.div`
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 767px) {
    margin-top: 20px;
  }
`
const MemberText = styled.div`
  font-size: 20px;
`
const BackOver = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
`
const Modal = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  z-index: 11;
  min-height: 100vh;
  @media screen and (max-width: 767px) {
    width: calc(100vw - 100px);
    top: 5vh;
  }
`
const LoginForm = styled.div`
  position: relative;

  background-color: white;
  padding: 30px;
  text-align: left;
  @media screen and (max-width: 767px) {
    max-height: 600px;
    overflow: scroll;
  }
`
const Logo = styled.div`
  margin: 0 auto;
  margin-bottom: 36px;

  background-image: url(${LogoPic});
  background-size: cover;
  width: 260px;
  height: 48px;
  background-size: cover;
  @media screen and (max-width: 767px) {
    width: 129px;
    height: 24px;
    margin-bottom: 20px;
  }
`
const AccountLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  text-align: left;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`
const AccountInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  margin-top: 12px;
  border: 1px solid #3f3a3a;
  border-radius: 8px;

  font-size: 20px;

  background-image: url(${Person});
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px;

  margin-bottom: 24px;
  @media screen and (max-width: 767px) {
    margin-bottom: 12px;
    padding: 12px 35px;
    font-size: 16px;
  }
`
const PasswordInput = styled(AccountInput)`
  background-image: url(${Password});
`
const EmailInput = styled(AccountInput)`
  background-image: url(${Mail});
`
const BecomeMember = styled(BtnMember)`
  width: 100%;
  margin: 0 auto;
  margin-top: 24px;
`
const NotMemberText = styled.div`
  font-size: 12px;
  margin-top: 12px;
  span {
    cursor: pointer;
    opacity: 40%;
  }
`
const Tag = styled.input`
  font-size: 24px;
  margin: 10px 20px;

  @media screen (max-width: 767px) {
    margin: 10px 20px;
    width: 40%;
    font-size: 12px;
  }
`
const UploadPic = styled.div`
  margin-top: 20px;
  width: 180px;
  height: 180px;
  background-color: #d9d9d9;
  border-radius: 50%;
  @media screen and (max-width: 767px) {
    width: 120px;
    height: 120px;
  }
`
const UploadPhoto = styled.img`
  width: 180px;
  aspect-ratio: 1/1;
  background-color: #d9d9d9;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 120px;
  }
`
const FollowPerson = styled.img`
  width: 80px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 12px;
  @media screen and (max-width: 767px) {
    margin-right: 0px;
    margin-bottom: 8px;
  }
`

function Profile() {
  const [fbprofile, setfbProfile] = useState()
  const [checkinToken, setcheckinToken] = useState(false)
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [getUserProfile, setGetUserProfile] = useState(
    JSON.parse(window.localStorage.getItem('jwtToken')) || [],
  )
  const accountRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const checkinAccount = useRef()
  const checkinPassword = useRef()
  const currImage = images[0]
  const style = {
    width: '50%',
  }

  // useEffect(()=>{
  //   if(getUserProfile){
  //   }
  // })

  let jwtToken = window.localStorage.getItem('jwtToken')

  async function getProfile() {
    if (!jwtToken) {
      try {
        jwtToken = await getJwtToken()
      } catch (e) {
        window.alert(e.message)
        return
      }
    }
    window.localStorage.setItem('jwtToken', jwtToken)
    const { data } = await api.getProfile(jwtToken)
    setfbProfile(data)
  }

  const registerProcess = async () => {
    const register = async () => {
      console.log(123456)
      if (
        !accountRef.current.value ||
        !passwordRef.current.value ||
        !emailRef.current.value ||
        images.length < 1
      ) {
        alert('表格不可為空')
        // setcheckinToken(false)
      } else {
        var formdata = new FormData()
        formdata.append('signup_upload_files', currImage)
        formdata.append('name', accountRef.current.value)
        formdata.append('email', emailRef.current.value)
        formdata.append('password', passwordRef.current.value)
        const response = await fetch(
          `https://hazlin.work/api/1.0/user/signup`,
          {
            body: formdata,
            method: 'POST',
          },
        )
        // console.log(response)
        if (response.status === 200) {
          alert('註冊成功，直接進入會員頁面')
          accountRef.current.value = ''
          passwordRef.current.value = ''
          emailRef.current.value = ''
          images[0] = undefined
          setcheckinToken(true)
        } else if (response.status === 403) {
          alert('email重複註冊')
          setcheckinToken(false)
        } else {
          console.log('照片錯了')
        }
        return await response.json()
        // setGetUserProfile(await response.json())
      }
    }
    async function getProfileAPI() {
      let resJSON = await register()
      let resJSONData = await resJSON.data
      let resUserToken = await resJSONData.access_token

      const response = await fetch(`https://hazlin.work/api/1.0/user/profile`, {
        headers: new Headers({
          Authorization: `Bearer ${resUserToken}`,
        }),
      })
      console.log(1234)
      if (response.status === 200) {
        const profileList = await response.json()
        console.log(profileList)
        let UserInfo = {
          token: resUserToken,
          name: profileList.data.name,
          email: profileList.data.email,
          photo: profileList.data.picture,
        }
        console.log(UserInfo)
        window.localStorage.setItem('jwtToken', JSON.stringify(UserInfo))
      }
    }
    getProfileAPI()
  }
  console.log(getUserProfile)

  const checkInProgress = async () => {
    const checkIn = async () => {
      if (!checkinAccount.current.value || !checkinPassword.current.value) {
        alert('表格不能為空')
      } else {
        let checkinData = {
          provider: 'native',
          email: checkinAccount.current.value,
          password: checkinPassword.current.value,
        }
        const response = await fetch(
          'https://hazlin.work/api/1.0/user/signin',
          {
            body: JSON.stringify(checkinData),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            method: 'POST',
          },
        )
        if (response.status === 200) {
          alert('成功登入')
          setcheckinToken(true)
          return await response.json()
        } else if (response.status === 403) {
          alert('Email或帳號有誤')
        }
      }
    }
    async function getProfileAPI() {
      let resJSON = await checkIn()
      let resJSONData = await resJSON.data
      let resUserToken = await resJSONData.access_token

      const response = await fetch(`https://hazlin.work/api/1.0/user/profile`, {
        headers: new Headers({
          Authorization: `Bearer ${resUserToken}`,
        }),
      })
      console.log(1234)
      if (response.status === 200) {
        const profileList = await response.json()
        console.log(profileList)
        let UserInfo = {
          token: resUserToken,
          name: profileList.data.name,
          email: profileList.data.email,
          photo: profileList.data.picture,
        }
        console.log(UserInfo)
        window.localStorage.setItem('jwtToken', JSON.stringify(UserInfo))
      }
    }
    getProfileAPI()
  }

  useEffect(() => {
    if (jwtToken) {
      setcheckinToken(true)
    }
    if (images.length < 1) return
    const newImageUrls = []
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])

  function getPhotoInfo(e) {
    setImages([...e.target.files])
    console.log(e.target.files[0])
  }

  return (
    <>
      {!checkinToken && (
        <Wrapper>
          <>
            <Title>加入會員，引領潮流</Title>
            <MainLogin>
              <HotImage>
                <HotImageList />
                <HotImageList />
                <HotImageList />
              </HotImage>
              <SubTitle>用以下帳號繼續</SubTitle>
              <Btn onClick={getProfile}>使用Facebook登入</Btn>
              <SubTitle>或用 超會搭 帳號</SubTitle>
              <BtnDivide>
                <Popup trigger={<BtnMember>註冊</BtnMember>} modal>
                  {(close) => (
                    <BackOver>
                      <Modal>
                        <LoginForm>
                          {/* <Divide> */}
                          <Logo />
                          <CloseBtn
                            onClick={() => {
                              close()
                            }}
                          >
                            x
                          </CloseBtn>
                          {/* </Divide> */}
                          <AccountLabel type="label">超會搭用戶名</AccountLabel>
                          <AccountInput
                            type="text"
                            ref={accountRef}
                          ></AccountInput>
                          <AccountLabel type="label">密碼</AccountLabel>
                          <PasswordInput
                            type="password"
                            ref={passwordRef}
                          ></PasswordInput>
                          <AccountLabel type="label">Email</AccountLabel>
                          <EmailInput type="text" ref={emailRef}></EmailInput>
                          <AccountLabel type="label">會員照片</AccountLabel>
                          <PhotoDivide>
                            <UploadPic>
                              {' '}
                              {imageURLs.map((imageSrc, index) => (
                                <UploadPhoto
                                  key={index}
                                  src={imageSrc}
                                  alt="uploadImage"
                                />
                              ))}
                            </UploadPic>
                            <Tag
                              style={style}
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={getPhotoInfo}
                            />
                          </PhotoDivide>
                          <Text>
                            按下註冊鈕的同時，表示您已詳閱我們的資料使用政策與使用條款
                          </Text>
                          <BecomeMember onClick={registerProcess}>
                            註冊
                          </BecomeMember>
                        </LoginForm>
                      </Modal>
                    </BackOver>
                  )}
                </Popup>
                <Popup trigger={<BtnMember>登入</BtnMember>} modal>
                  {(close) => (
                    <BackOver>
                      <Modal>
                        <LoginForm>
                          <Divide>
                            <Logo />
                            <CloseBtn
                              onClick={() => {
                                close()
                              }}
                            >
                              x
                            </CloseBtn>
                          </Divide>
                          <AccountLabel type="label">超會搭Email</AccountLabel>
                          <AccountInput
                            type="text"
                            ref={checkinAccount}
                          ></AccountInput>
                          <AccountLabel type="label">密碼</AccountLabel>
                          <PasswordInput
                            type="password"
                            ref={checkinPassword}
                          ></PasswordInput>
                          <BecomeMember onClick={checkInProgress}>
                            登入
                          </BecomeMember>
                          <Divide>
                            <NotMemberText>
                              還不是會員嗎？
                              <span onClick>立刻註冊新帳號</span>
                            </NotMemberText>
                          </Divide>
                        </LoginForm>
                      </Modal>
                    </BackOver>
                  )}
                </Popup>
              </BtnDivide>
            </MainLogin>
          </>
        </Wrapper>
      )}
      {fbprofile && (
        <>
          <MemberWrapper>
            <MemberDivide>
              <MemberText>
                歡迎 {jwtToken ? fbprofile.name : null} 教主回歸
              </MemberText>
              <CheckOutBtn
                onClick={() => {
                  window.localStorage.removeItem('jwtToken')
                  alert('成功登出')
                  setfbProfile()
                }}
              >
                登出
              </CheckOutBtn>
            </MemberDivide>
          </MemberWrapper>
          <Member />
        </>
      )}
      {checkinToken && (
        <>
          <MemberWrapper>
            <MemberDivide>
              <MemberText>
                <LoginDivide>
                  <FollowPerson
                    src={
                      getUserProfile
                        ? getUserProfile.photo
                        : 'https://hazlin.work//assets/userpictures/89a5fcc3.jpeg'
                    }
                  />
                  歡迎 {getUserProfile ? getUserProfile.name : null} 教主回歸
                </LoginDivide>
              </MemberText>
              <CheckOutBtn
                onClick={() => {
                  window.localStorage.removeItem('jwtToken')
                  alert('成功登出')
                  setcheckinToken(false)
                  // setregisterToken(false)
                }}
              >
                登出
              </CheckOutBtn>
            </MemberDivide>
          </MemberWrapper>
          <Member />
        </>
      )}
    </>
  )
}

export default Profile
