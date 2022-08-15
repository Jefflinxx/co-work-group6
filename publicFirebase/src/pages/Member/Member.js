import { useEffect, useState, useRef } from 'react'
import main from './main.png'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 40px;
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
const Function = styled.div`
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
`
const Order = styled.div`
  width: 700px;
  margin: 0 auto;
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
const buyHistory = [
  {
    //訂單編號
    //購買時間
    //總金額
    id: '1',
    name: '衣服',
    price: 123,
    color: '白',
    size: 'XL',
    qty: 10,
  },
]

// async function fetchOrders() {
//   try {
//     const response = await fetch('https://hazlin.work/api/1.0/user/order')
//     if ((await response.json().length) <= 0) {
//       console.log('尚無購買任何商品')
//     }
//     console.log(await response.json())
//     return await response.json()
//   } catch {
//     console.log((err) => `Error:${err}`)
//   }
// }
function Member() {
  const [isOpen, setIsOpen] = useState(false)

  function showMore() {
    setIsOpen((prevCheck) => !prevCheck)
  }
  return (
    <>
      <Wrapper>
        <Divide>
          {['購買紀錄', '分享潮流', '潮流過往'].map((text, index) => (
            <Function key={index}>{text}</Function>
          ))}
        </Divide>
        <Order>
          <TextTitle>訂單編號：</TextTitle>
          <TextTitle>日期：</TextTitle>
          <OrderDivide>
            <TextTitle>金額：</TextTitle>
            <ShowMore onClick={showMore}>展開明細</ShowMore>
          </OrderDivide>
          {isOpen && (
            <Order>
              <OrderDivide>
                <OrderDivide>
                  <ProductImage></ProductImage>
                  <OrderInfo>
                    <p>前開衩扭結洋裝</p>
                    <p>顏色｜白</p>
                    <p>尺寸｜M</p>
                  </OrderInfo>
                </OrderDivide>
                <OrderPriceDivide>
                  <TextTitle>數量</TextTitle>
                  <TextTitle>1</TextTitle>
                </OrderPriceDivide>
                <OrderPriceDivide>
                  <TextTitle>小計</TextTitle>
                  <TextTitle>NT 799</TextTitle>
                </OrderPriceDivide>
              </OrderDivide>
            </Order>
          )}
        </Order>
      </Wrapper>
    </>
  )
}

export default Member
