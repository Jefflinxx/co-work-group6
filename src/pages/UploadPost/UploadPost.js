import { useEffect, useState, useRef } from 'react'
import Camera from './Camera.png'
import Local from './Upload File.png'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`
const Divide = styled.div`
  display: flex;
`
const DeleteDivide = styled(Divide)`
  align-items: center;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
`
const WayPicLocal = styled.div`
  background-image: url(${Camera});
  width: 60px;
  height: 60px;
  background-size: cover;
  cursor: pointer;
`
const WayPicCamera = styled(WayPicLocal)`
  background-image: url(${Local});
  margin-left: 24px;
`
const UploadWay = styled(Divide)`
  flex-direction: column;
  flex-grow: 1;
  width: 15%;
`
const UploadWayTag = styled(UploadWay)`
  display: flex;
  flex-direction: row;
  width: 50%;
  margin-left: 24px;
`
const UploadProduct = styled(UploadWay)`
  width: 80%;
`
const CustomisedTag = styled(UploadWay)`
  width: 80%;
`
const UploadPic = styled.div`
  margin-top: 20px;
  width: 360px;
  height: 480px;
  background-color: #d9d9d9;
  border-radius: 8px;
`
const UploadPhoto = styled.img`
  width: 360px;
  aspect-ratio: 0.75/1;
  background-color: #d9d9d9;
  border-radius: 8px;
  object-fit: cover;
`
const Tag = styled.input`
  font-size: 24px;
  margin: 20px 45px;
`
const Label = styled.label`
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 12px;
`
const PutTag = styled.input`
  font-size: 20px;
  line-height: 20px;

  border: 1px solid #979797;
  border-radius: 8px;
  height: 60px;
  padding: 20px;
  width: 100%;
`
const ShowTag = styled.div`
  position: relative;
`
const TagBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  background-color: #979797;
  width: 100px;
  height: 60px;
  text-align: center;
  padding: 20px;
  color: white;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
`
const UploadBtn = styled.div`
  cursor: pointer;
  width: 30%;
  flex-grow: 1;
  text-align: center;

  margin-top: 20px;
  padding: 16px;
`
const Note = styled.span`
  font-size: 14px;
  color: red;
  margin-bottom: 12px;
`
const SelectTag = styled.select`
  width: 95%;
  height: 60px;
  padding-left: 20px;
  border-radius: 8px;
  border: solid 1px #979797;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`
// const ClickedTag = styled.div`
//   text-align: center;
//   font-size: 20px;
//   line-height: 20px;
//   padding: 10px;
//   width: 95%;
//   margin-top: 20px;
//   ${'' /* background-color: rgba(0, 0, 0, 0.2); */}
//   height: 40px;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   border-radius: 8px;
// `
const ShowTagList = styled(ShowTag)`
  margin-top: 12px;
  font-size: 24px;
  margin-bottom: 12px;
`
const DeleteBtn = styled.button`
  border-radius: 8px;
  border: 1px solid black;
  width: 100px;
  height: 30px;
  background-color: white;
  ${'' /* padding: 12px; */}
  font-size: 20px;
  line-height: 20px;

  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #e53935;
    color: white;
  }
`

function UploadPost() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [savedTag, setSavedTag] = useState([])
  const productTag = useRef()
  const customizedTag = useRef()
  const [savedCustomizedTag, setsavedCustomizedTag] = useState([])
  // console.log(productTag.current.value)
  function onImageChange(e) {
    setImages([...e.target.files])
  }
  const currImage = images[0]
  // // console.log(currImage)
  const lists = ['前開洋裝', '牛仔褲']
  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = []
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])
  // // 儲存按過的select
  function showProductTag() {
    // let savedTag = []
    let currentTag = productTag.current.value
    console.log(productTag.current.value)
    savedTag.push(currentTag)
    setSavedTag([productTag.current.value, ...savedTag])
    console.log(savedTag)
  }
  function addtagInput() {
    // const TodoList = [
    //   { id: 1, text: customizedTag.current.value, checked: false },
    // ]
    savedCustomizedTag.push(customizedTag.current.value)
    setsavedCustomizedTag([...savedCustomizedTag])
    console.log(savedCustomizedTag)
    customizedTag.current.value = ''
    if (savedCustomizedTag.length > 0 && savedCustomizedTag.length > 6) {
      alert('最多輸入五個Tag')
    }
  }
  async function uploadFile() {
    console.log(123)
    var myHeaders = new Headers()
    // myHeaders.append('Content-Type', 'multipart/form-data')
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXNkc2FmIiwiZW1haWwiOiJzZGZhZHNmZkBnbWFpbC5jb20iLCJwaWN0dXJlIjpudWxsLCJpYXQiOjE2NjAyODU2ODd9.LSd7R0fx3KwDlVotbgPPquuLrG9ZlPrvXORukKprNvU',
    )
    var formdata = new FormData()
    formdata.append('main_image', currImage)
    formdata.append('tag', '["漂亮","裙子"]')
    formdata.append(
      'products',
      '[{"pid":201902191247,"pName":"經典修身長筒牛仔褲"},{"pid":201902191245,"pName":"小扇紋質感上衣"}]',
    )
    const res = await fetch(`https://hazlin.work/api/1.0/user/post`, {
      body: formdata,
      headers: myHeaders,
      method: 'POST',
    })
    if (res.status === 200) {
      alert('上傳成功')
    } else if (res.status === 400) {
      alert('上傳失敗')
    }
    // .then((res) => {
    //   if (!res.ok) {
    //     throw res.statusText
    //   }
    //   return res.json()
    // })
    // .then(({ data }) => console.log('data', data))
    // .catch((err) => console.log('err', err))
  }
  // function deleteTag() {
  //   console.log(123)
  //   // let deleteIndex
  //   // if(deleteIndex===key){
  //   //   console.log('即將刪除')
  //   // }
  // }
  return (
    <>
      <Wrapper>
        <Title>上傳你的自信穿搭</Title>
        <Divide>
          <UploadWay>
            <Divide>
              <WayPicLocal></WayPicLocal>
              <WayPicCamera></WayPicCamera>
            </Divide>
            <UploadPic>
              {imageURLs.map((imageSrc, index) => (
                <UploadPhoto key={index} src={imageSrc} alt="uploadImage" />
              ))}
            </UploadPic>
            <Tag
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              onClick={(e) => console.log(e.target.files)}
            />
          </UploadWay>
          <UploadWayTag>
            <UploadProduct>
              <Label>圖片所包含商品</Label>
              <Note>*必填</Note>
              <SelectTag>
                請選擇圖片所含商品
                {lists ? (
                  lists.map((list, key) => {
                    return (
                      <>
                        <option
                          key={key}
                          ref={productTag}
                          onClick={showProductTag}
                        >
                          {list}
                        </option>
                      </>
                    )
                  })
                ) : (
                  <Note>您尚未買過任何商品</Note>
                )}
              </SelectTag>
            </UploadProduct>
            <CustomisedTag>
              <Label>加入商品名稱TAG</Label>
              <Note>最多輸入5個</Note>
              <ShowTag>
                <PutTag type="text" ref={customizedTag} />
                <TagBtn onClick={addtagInput}>輸入</TagBtn>
              </ShowTag>
              {savedCustomizedTag &&
                savedCustomizedTag.map((tag, index) => {
                  return (
                    <>
                      <DeleteDivide>
                        <ShowTagList key={index}>{tag}</ShowTagList>
                        <DeleteBtn>Delete</DeleteBtn>
                      </DeleteDivide>
                    </>
                  )
                })}
            </CustomisedTag>
          </UploadWayTag>
        </Divide>
        <UploadBtn onClick={uploadFile}>送出貼文</UploadBtn>
      </Wrapper>
    </>
  )
}
export default UploadPost
