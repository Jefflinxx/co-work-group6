import { useEffect, useState } from 'react'
import styled from 'styled-components'
import main from './main.png'
import facebook from './facebook.png'
import Person from './Person.png'
import Mail from './Mail.png'
import Password from './Password.png'
import LogoPic from './logo.png'
import Popup from 'reactjs-popup'

import api from '../../utils/api'
import getJwtToken from '../../utils/getJwtToken'

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
const Divide = styled.div`
  display: flex;
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
  &:hover {
    background-color: #8b572a;
    color: white;
    border: 1px solid #8b572a;
  }
`
const CloseBtn = styled.button`
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;

  &:hover {
    background-color: black;
    color: white;
  }
`

const CheckInBtn = styled(Btn)`
  cursor: not-allowed;
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
  top: 10px;
  z-index: 11;
  min-height: 100vh;
`
const LoginForm = styled.div`
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

  useEffect(() => {
    async function getProfile() {
      let jwtToken = window.localStorage.getItem('jwtToken')

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
    getProfile()
  }, [])

  return (
    <Wrapper>
      <Title>加入會員，引領潮流</Title>
      <MainLogin>
        <HotImage>
          <HotImageList />
          <HotImageList />
          <HotImageList />
        </HotImage>
        <SubTitle>用以下帳號繼續</SubTitle>
        <Btn onClick={Profile}>使用Facebook登入</Btn>
        {fbprofile && <CheckInBtn>已登入</CheckInBtn>}
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
                    <AccountInput type="text"></AccountInput>
                    <AccountLabel type="label">密碼</AccountLabel>
                    <PasswordInput type="text"></PasswordInput>
                    <AccountLabel type="label">Email</AccountLabel>
                    <EmailInput type="text"></EmailInput>
                    <Text>
                      按下註冊鈕的同時，表示您已詳閱我們的資料使用政策與使用條款
                    </Text>
                    <BecomeMember>註冊</BecomeMember>
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
                    <AccountInput type="text"></AccountInput>
                    <AccountLabel type="label">密碼</AccountLabel>
                    <PasswordInput type="text"></PasswordInput>
                    <BecomeMember>登入</BecomeMember>
                    <Divide>
                      <NotMemberText>
                        還不是會員嗎？<span>立刻註冊新帳號</span>
                      </NotMemberText>
                    </Divide>
                  </LoginForm>
                </Modal>
              </BackOver>
            )}
          </Popup>
        </Divide>
      </MainLogin>
    </Wrapper>
  )
}

export default Profile
