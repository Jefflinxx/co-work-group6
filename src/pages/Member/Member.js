import { useEffect, useState, useRef } from 'react'
import main from './main.png'
import UploadPost from '../UploadPost/UploadPost'
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
const ProductImage = styled.div`
  width: 114px;
  aspect-ratio: 0.75/1;

  background-image: url(${main});
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

const fakeOrder = {
  uid: 1,
  uname: 'Adam',
  uemail: '123@gmail.com',
  list: [
    {
      oid: 4996,
      ptitle: '經典修身長筒牛仔褲',
      time: '2022-08-12 02:25',
      price: 699,
      color: '白',
      size: 'XL',
      qty: 10,
      total: 6990,
    },
    {
      oid: 4997,
      ptitle: '小扇紋質感上衣',
      time: '2022-08-13 03:10',
      price: 499,
      color: '黑',
      size: 'L',
      qty: 10,
      total: 4990,
    },
    {
      oid: 4998,
      ptitle: '透肌澎澎薄紗襯衫',
      time: '2022-08-14 06:10',
      price: 599,
      color: '黃',
      size: 'M',
      qty: 10,
      total: 5990,
    },
  ],
}

function Member() {
  const [isOpen, setIsOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [orderIsOpen, setOrderIsopen] = useState(false)
  const [currentPage, setCurrentPage] = useState()

  function showMore() {
    setIsOpen((prevCheck) => !prevCheck)
    setIsActive((current) => !current)
  }

  async function fetchOrders() {
    setIsClick((current) => !current)
    if (fakeOrder.list.length <= 0) {
      alert('目前尚無訂單')
    } else {
      setOrderIsopen((prevCheck) => !prevCheck)
    }
    // let faketoken = JSON.parse(window.localStorage.getItem('checkInToken'))
    // // console.log(faketoken.token)
    // faketoken.token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJZYWhvbyIsImVtYWlsIjoiMzMzMzNAZ21haWwuY29tIiwicGljdHVyZSI6bnVsbCwiaWF0IjoxNjYwMjg4ODQ0fQ.0WnS1d5OiGfIv9MqkKOVpugl-gwPvWPjHVSum2M8kkM'
    // window.localStorage.setItem('checkInToken', JSON.stringify(faketoken.token))

    console.log(123)
    // try {
    //   const response = await fetch('https://hazlin.work/api/1.0/user/orders')
    //   // if ((await response.json().length) <= 0) {
    //   //   console.log('尚無購買任何商品')
    //   // }
    //   console.log(await response.json())
    //   return await response.json()
    // } catch {
    //   console.log((err) => `Error:${err}`)
    // }
  }
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
            {orderIsOpen && (
              <>
                <Order>
                  <TextTitle>訂單編號：123</TextTitle>
                  <TextTitle>日期：123</TextTitle>
                  <OrderDivide>
                    <TextTitle>金額：NT 123</TextTitle>
                    <ShowMore
                      onClick={showMore}
                      style={{
                        backgroundColor: isActive ? '#8B572A' : 'white',
                        color: isActive ? 'white' : 'black',
                      }}
                    >
                      展開明細
                    </ShowMore>
                  </OrderDivide>
                </Order>
              </>
            )}
            {isOpen &&
              fakeOrder.list.map((list, index) => {
                return (
                  <Order key={index}>
                    <OrderDivide>
                      <OrderDivide>
                        <ProductImage></ProductImage>
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
              })}
          </>
        )}
        {currentPage === 1 && <UploadPost />}
        {currentPage === 2 && <FollowingList></FollowingList>}
      </Wrapper>
    </>
  )
}

export default Member
