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
`
const MemberWrapper = styled.div`
  padding: 60px 20px;
  margin: 0 auto;
  max-width: 1160px;
`
const Divide = styled.div`
  display: flex;
  justify-content: space-between;
`
const MemberDivide = styled(Divide)`
  margin: 0 auto;
  max-width: 1160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  margin-bottom: 32px;
  font-size: 36px;
  font-weight: bold;
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
`
const CheckOutBtn = styled.div`
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const MemberText = styled.div`
  font-size: 20px;
`
const BackOver = styled.div`
  ${'' /* display: none; */}
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
`
const LoginForm = styled.div`
  position: relative;

  background-color: white;
  padding: 30px;
  text-align: left;
`
const Logo = styled.div`
  margin: 0 auto;
  margin-bottom: 36px;

  background-image: url(${LogoPic});
  width: 260px;
  height: 48px;
  background-size: cover;
`
const AccountLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  text-align: left;
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
const SuccessLogin = styled(BecomeMember)``
const NotMemberText = styled.div`
  font-size: 12px;
  margin-top: 12px;
  span {
    cursor: pointer;
    opacity: 40%;
  }
`

function Profile() {
  const [fbprofile, setfbProfile] = useState()
  const [registerToken, setregisterToken] = useState(false)
  const [checkinToken, setcheckinToken] = useState(false)
  const accountRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()
  const checkinAccount = useRef()
  const checkinPassword = useRef()

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
      if (
        !accountRef.current.value ||
        !passwordRef.current.value ||
        !emailRef.current.value
      ) {
        alert('表格不可為空')
      } else {
        let registerData = {
          name: accountRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
        console.log(registerData)
        const response = await fetch(
          `https://hazlin.work/api/1.0/user/signup`,
          {
            body: JSON.stringify(registerData),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            method: 'POST',
          },
        )
        if (response.status === 200) {
          alert('註冊成功')
          accountRef.current.value = ''
          passwordRef.current.value = ''
          emailRef.current.value = ''
          // setIsRegister(true)
        } else if (response.status === 403) {
          alert('email重複註冊')
        }
        return await response.json()
      }
    }
    async function setUserInfo() {
      let resJSON = await register()
      // console.log(resJSON)
      let resUserInfo = await resJSON.data
      let registerName = await resUserInfo.user.name
      let resUserToken = await resUserInfo.access_token
      let registerEmail = await resUserInfo.user.email
      let UserInfo = {
        name: registerName,
        token: resUserToken,
        email: registerEmail,
      }
      window.localStorage.setItem('registerToken', JSON.stringify(UserInfo))
    }
    setUserInfo()
    if (window.localStorage.getItem('registerToken') !== []) {
      setregisterToken(true)
    }
  }
  const checkInProcess = () => {
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
          // checkinAccount.current.value = ''
          // checkinPassword.current.value = ''
        } else if (response.status === 403) {
          alert('Email或帳號有誤')
        }
        return await response.json()
      }
    }
    async function setUserInfo() {
      let resJSON = await checkIn()
      let resCheckInfo = await resJSON.data
      let resCheckName = await resCheckInfo.user.name
      let resCheckEmail = await resCheckInfo.user.email
      let resCheckToken = await resCheckInfo.access_token
      let setcheckInInfo = {
        token: resCheckToken,
        name: resCheckName,
        email: resCheckEmail,
      }
      window.localStorage.setItem(
        'checkInToken',
        JSON.stringify(setcheckInInfo),
      )
    }
    setUserInfo()
    if (window.localStorage.getItem('checkInToken') !== []) {
      setcheckinToken(true)
    }
  }

  console.log(checkinToken)
  const registerData = JSON.parse(window.localStorage.getItem('registerToken'))
  const LoginName = JSON.parse(window.localStorage.getItem('checkInToken'))
  // console.log(LoginName)
  // const [LoginNameInfo, setLoginNameInfo] = useState(LoginName)
  useEffect(() => {
    if (LoginName !== null) {
      // setLoginNameInfo(LoginNameInfo)
      setcheckinToken(true)
    }
  }, [])

  function directToMember() {
    let directInfo = JSON.parse(window.localStorage.getItem('registerToken'))
    let registernData = {
      provider: 'native',
      name: directInfo.name,
      email: directInfo.email,
      password: directInfo.name,
      token: directInfo.token,
    }
    window.localStorage.removeItem('registerToken')
    window.localStorage.setItem('checkInToken', JSON.stringify(registernData))

    setcheckinToken(true)
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
              <Divide>
                <Popup trigger={<BtnMember>註冊</BtnMember>} modal>
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
                          <AccountLabel type="label">超會搭用戶名</AccountLabel>
                          <AccountInput
                            type="text"
                            ref={accountRef}
                          ></AccountInput>
                          <AccountLabel type="label">密碼</AccountLabel>
                          <PasswordInput
                            type="text"
                            ref={passwordRef}
                          ></PasswordInput>
                          <AccountLabel type="label">Email</AccountLabel>
                          <EmailInput type="text" ref={emailRef}></EmailInput>
                          <Text>
                            按下註冊鈕的同時，表示您已詳閱我們的資料使用政策與使用條款
                          </Text>
                          <BecomeMember onClick={registerProcess}>
                            註冊
                          </BecomeMember>
                          {registerToken && (
                            <SuccessLogin onClick={directToMember}>
                              直接進入會員頁面
                            </SuccessLogin>
                          )}
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
                            type="text"
                            ref={checkinPassword}
                          ></PasswordInput>
                          <BecomeMember onClick={checkInProcess}>
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
              </Divide>
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
                歡迎 {LoginName ? LoginName.name : null} 教主回歸
              </MemberText>
              <CheckOutBtn
                onClick={() => {
                  window.localStorage.removeItem('checkInToken')
                  alert('成功登出')
                  setcheckinToken(false)
                  setregisterToken(false)
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
