import { useEffect, useState, useRef } from 'react'
import main from './main.png'
import PostUpload from '../PostUpload/PostUpload'
import FollowingList from '../FollowingList/FollowingList'

import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1160px;
  padding-right: 20px;
  padding-left: 20px;
`
const Divide = styled.div`
  display: flex;
`
const OrderDivideOuter = styled(Divide)`
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`
const OrderDivide = styled(Divide)`
  justify-content: space-between;
  align-items: center;
`

const OrderPicDivide = styled(Divide)`
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const OrderPriceDivide = styled(Divide)`
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 767px) {
    flex-direction: row;
    margin-top: 12px;
    width: 100%;
  }
`
const Category = styled.div`
  text-align: center;
  font-size: 18px;

  width: 33%;
  flex-grow: 1;
  border: 1px solid black;
  padding: 14px;
  margin-bottom: 40px;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #8b572a;
    color: white;
    border: 1px solid #8b572a;
  }
  background-color: ${(props) => (props.$isActive ? '#8B572A' : 'white')};
  color: ${(props) => (props.$isActive ? 'white' : 'black')};
  border: 1px solid ${(props) => (props.$isActive ? '#8B572A' : 'black')};

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
    font-size: 14px;
  }
`
const Order = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-bottom: 12px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin-top: 12px;
`
const TextTitle = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
`
const ShowMore = styled.div`
  font-size: 20px;
  padding: 8px;
  width: 120px;
  text-align: center;

  background-color: white;
  ${'' /* border-bottom: 1px solid black; */}
  cursor: pointer;

  transition: all 0.3s;
  ${'' /* &:hover {
    background-color: #8b572a;
    color: white;
  } */}
  @media screen and (max-width: 767px) {
    font-size: 12px;
    width: 80px;
  }
`
const ProductImage = styled.img`
  width: 114px;
  aspect-ratio: 0.75/1;

  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 576px) {
    width: 100px;
  }
`
const OrderInfo = styled.div`
  flex-firection: column;
  font-size: 18px;
  margin-left: 12px;
  p {
    margin-bottom: 12px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    width: 100%;
  }
`
const OpenOrder = styled.div`
  width: 150px;
  border: 1px solid #bc9272;
  color: #bc9272;
  font-size: 20px;
  padding: 20px;
  margin-bottom: 12px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #bc9272;
    color: white;
  }
  @media screen and (max-width: 767px) {
    width: 80px;
    padding: 10px;
    font-size: 14px;
  }
`
const Note = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: red;
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`
function Member() {
  const [isOpen, setIsOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [orderIsOpen, setOrderIsopen] = useState(false)
  const [getUserProfile, setGetUserProfile] = useState(
    JSON.parse(window.localStorage.getItem('jwtToken')) || [],
  )
  const [currentPage, setCurrentPage] = useState()
  const [pastProduct, setPastProduct] = useState()
  const [notBuy, setNotBuy] = useState()

  function showMore() {
    setOrderIsopen((prevCheck) => !prevCheck)
    setIsActive((current) => !current)
  }
  let jwtToken = window.localStorage.getItem('jwtToken')

  useEffect(() => {
    if (jwtToken) {
      fetchOrders()
    }
  }, [])

  async function fetchOrders() {
    setIsOpen((prevCheck) => !prevCheck)
    const response = await fetch(`https://hazlin.work/api/1.0/orders`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      setIsClick((current) => !current)
      const productList = await response.json()
      setPastProduct(productList)
      if (pastProduct.list[0].length === 0) {
        console.log('沒買過東西')
        setNotBuy(false)
      } else if (pastProduct.list[0].length !== 0) {
        setNotBuy(true)
      }
    }
  }
  // console.log(pastProduct)

  return (
    <>
      <Wrapper>
        <Divide>
          {['購買紀錄', '分享潮流', '潮流過往'].map((text, index) => (
            <Category
              $isActive={index === tabIndex}
              key={index}
              onClick={() => {
                setTabIndex(index)
                setCurrentPage(index)
              }}
            >
              {text}
            </Category>
          ))}
        </Divide>
        {currentPage === 0 && (
          <>
            <OpenOrder
              onClick={fetchOrders}
              style={{
                backgroundColor: isClick ? '#bc9272' : 'white',
                color: isClick ? 'white' : '#bc9272',
              }}
            >
              訂單明細
            </OpenOrder>
            {notBuy && isOpen && pastProduct ? (
              <>
                <Order>
                  <TextTitle>
                    訂單編號：
                    {pastProduct ? pastProduct.list[0].oid : null}
                  </TextTitle>
                  <TextTitle>
                    日期：{pastProduct ? pastProduct.list[0].time : null}
                  </TextTitle>
                  <OrderDivide>
                    <ShowMore
                      onClick={showMore}
                      style={{
                        // backgroundColor: isActive ? '#F8D6C2' : 'white',
                        color: 'black',
                        borderBottom: isActive ? '1px dashed black' : 'none',
                      }}
                    >
                      展開明細
                    </ShowMore>
                  </OrderDivide>
                </Order>
              </>
            ) : null}
            {!notBuy && <Note>您尚未購買過商品</Note>}
            {orderIsOpen && pastProduct
              ? pastProduct.list.map((list, index) => {
                  return (
                    <Order key={index}>
                      <OrderDivideOuter>
                        <OrderPicDivide>
                          <ProductImage src={list.postPic} />
                          <OrderInfo>
                            <p>{list.ptitle}</p>
                            <p>顏色｜{list.color}</p>
                            <p>尺寸｜{list.size}</p>
                          </OrderInfo>
                        </OrderPicDivide>
                        <OrderPriceDivide>
                          <TextTitle>數量</TextTitle>
                          <TextTitle>{list.qty}</TextTitle>
                        </OrderPriceDivide>
                        <OrderPriceDivide>
                          <TextTitle>小計</TextTitle>
                          <TextTitle>NT {list.qty * list.price}</TextTitle>
                        </OrderPriceDivide>
                      </OrderDivideOuter>
                      <Line></Line>
                    </Order>
                  )
                })
              : null}
          </>
        )}
        {currentPage === 1 && <PostUpload />}
        {currentPage === 2 && <FollowingList />}
      </Wrapper>
    </>
  )
}

export default Member
