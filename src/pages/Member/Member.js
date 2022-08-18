import { useEffect, useState, useRef } from 'react'
import main from './main.png'
import PostUpload from '../PostUpload/PostUpload'
import FollowingList from '../FollowingList/FollowingList'

import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`
const Divide = styled.div`
  display: flex;
`
const OrderDivide = styled(Divide)`
  justify-content: space-between;
  align-items: center;
`
const OrderPriceDivide = styled(Divide)`
  flex-direction: column;
  align-items: center;
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
`
const Order = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-bottom: 12px;
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
`
const ShowMore = styled.div`
  font-size: 20px;
  padding: 8px;
  width: 120px;
  text-align: center;

  background-color: white;
  border: 1px solid #8b572a;
  color: black;

  cursor: pointer;

  transition: all 0.3s;
  &:hover {
    background-color: #8b572a;
    color: white;
  }
`
const ProductImage = styled.img`
  width: 114px;
  aspect-ratio: 0.75/1;

  background-repeat: no-repeat;
  background-size: cover;
`
const OrderInfo = styled.div`
  flex-firection: column;
  font-size: 18px;
  margin-left: 12px;
  p {
    margin-bottom: 12px;
  }
`
const OpenOrder = styled.div`
  width: 150px;
  border: 1px solid #bc9272;
  color: #bc9272;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #bc9272;
    color: white;
  }
`
const Note = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: red;
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

  async function fetchOrders() {
    console.log(getUserProfile.token)
    setIsOpen((prevCheck) => !prevCheck)
    const response = await fetch(`https://hazlin.work/api/1.0/orders`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      const productList = await response.json()
      setPastProduct(productList)
      if (pastProduct.list.length === 0) {
        setNotBuy(false)
      } else if (pastProduct.list.length !== 0) {
        setNotBuy(true)
        setIsClick((current) => !current)
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
                backgroundColor: isClick ? 'white' : '#bc9272',
                color: isClick ? '#bc9272' : 'white',
              }}
            >
              訂單明細
            </OpenOrder>
            {isOpen && pastProduct.list.length > 0 ? (
              <>
                <Order>
                  <TextTitle>
                    訂單編號：
                    {pastProduct ? pastProduct.list.oid : null}
                  </TextTitle>
                  <TextTitle>
                    日期：{pastProduct ? pastProduct.list.time : null}
                  </TextTitle>
                  <OrderDivide>
                    {/* <TextTitle>總金額：NT {pastProduct.list.total}</TextTitle> */}
                    <ShowMore
                      onClick={showMore}
                      style={{
                        backgroundColor: isActive ? 'white' : '#8B572A',
                        color: isActive ? 'black' : 'white',
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
                      <OrderDivide>
                        <OrderDivide>
                          <ProductImage src={list.postPic} />
                          <OrderInfo>
                            <p>{list.ptitle}</p>
                            <p>顏色｜{list.color}</p>
                            <p>尺寸｜{list.size}</p>
                          </OrderInfo>
                        </OrderDivide>
                        <OrderPriceDivide>
                          <TextTitle>數量</TextTitle>
                          <TextTitle>{list.qty}</TextTitle>
                        </OrderPriceDivide>
                        <OrderPriceDivide>
                          <TextTitle>小計</TextTitle>
                          <TextTitle>NT {list.qty * list.price}</TextTitle>
                        </OrderPriceDivide>
                      </OrderDivide>
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
