import { useEffect, useState, useRef } from 'react'
import Camera from './Camera.png'
import Local from './Upload File.png'
import heart from './heart.png'
import saveActive from './save-active.png'
import Webcam from 'react-webcam'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1160px;
`
const Divide = styled.div`
  display: flex;
`
const Displayflex = styled.div`
  display: flex;
  position: relative;
`
const DivideColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const DisplayDivide = styled(Divide)`
  ${'' /* justify-content: space-between; */}
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`
const TagDivide = styled(Divide)`
  align-items: center;
  margin-top: 20px;
  width: 80%;
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
  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`
const WayPicLocal = styled.div`
  background-image: url(${Local});
  width: 60px;
  height: 60px;
  background-size: cover;
  cursor: pointer;
`
const WayPicCamera = styled(WayPicLocal)`
  background-image: url(${Camera});
`
const ScreenBtn = styled.button`
  width: 100%;
  font-size: 24px;
  border-radius: 8px;
  margin-top: 12px;
  padding: 12px;
  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 18px;
    width: 80%;
    margin-right: 6px;
    margin-left: 6px;
    margin-bottom: 12px;
  }
`
const UploadWay = styled(Divide)`
  position: relative;
  flex-direction: column;
  width: 35%;
  @media screen and (max-width: 1000px) {
    width: 15%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const UploadWayTag = styled(Divide)`
  justify-content: space-between;
  flex-grow: 1;
  width: 45%;
  @media screen and (max-width: 1200px) {
    width: 35%;
  }
  @media screen and (max-width: 1000px) {
    width: 15%;
    flex-direction: column;
    margin-left: 30px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const UploadProduct = styled.div`
  width: 85%;
  margin-right: 20px;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`
const CustomisedTag = styled.div`
  width: 85%;
  @media screen and (max-width: 1000px) {
    margin-right: 0;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
  }
`
const UploadPic = styled.div`
  margin-top: 20px;
  width: 360px;
  height: 480px;
  background-color: #d9d9d9;
  border-radius: 8px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const UploadPhoto = styled.img`
  width: 360px;
  aspect-ratio: 0.75/1;
  background-color: #d9d9d9;
  border-radius: 8px;
  object-fit: cover;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`
const Tag = styled.input`
  font-size: 24px;
  margin: 20px 45px;
`
const Label = styled.label`
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;

  width: 100%;
  color: black;
  background-color: #edc187;
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    padding: 4px;
  }
`
const TagLabel = styled.label`
  font-size: 20px;
  width: 80%;
  @media screen and (max-width: 1000px) {
    font-size: 14px;
    width: 100%;
  }
`
const FindProductTag = styled.div`
  font-size: 18px;
  margin-bottom: 12px;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
`
const PutTag = styled.input`
  font-size: 20px;
  line-height: 20px;
  width: 100%;
  border: 1px solid #979797;
  border-radius: 8px;
  height: 40px;
  padding: 20px;
  @media screen and (max-width: 1000px) {
    height: 30px;
    width: 100%;
  }
`
const ShowTag = styled.div`
  position: relative;
  ${'' /* width: 90%; */}
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`
const TagBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  background-color: #979797;
  width: 100px;
  height: 42px;
  text-align: center;
  padding: 12px;
  color: white;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    ${'' /* height: 30px; */}
    padding: 10px;
    width: 80px;
  }
`
const UploadBtn = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 24px;

  margin: 20px auto 40px auto;
  padding: 28px;

  border: 1px solid black;
  border-radius: 20px;

  &:hover {
    background-color: #bc9272;
    color: white;
  }
  @media screen and (max-width: 767px) {
    font-size: 18px;
    padding: 18px;
  }
`
const FindBtn = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 12px;
  background-color: transparent;
`
const FindPostBtn = styled.button`
  width: 100%;
  font-size: 20px;
  margin: 20px auto;
  text-align: center;
  border: none;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 767px) {
    margin-top: 0;
    font-size: 12px;
  }
`
const Note = styled.div`
  font-size: 14px;
  color: red;
  margin-bottom: 12px;
  white-space: no-wrap;
`
const IDnote = styled(Note)`
  font-size: 12px;
  color: gray;
  margin-top: 6px;
`

const ClickedTag = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid black;

  cursor: pointer;
`
const ShowTagList = styled(ShowTag)`
  margin-top: 12px;
  font-size: 24px;
  margin-bottom: 12px;
  @media screen and (max-width: 900px) {
    font-size: 16px;
  }
`
const DeleteBtn = styled.div`
  border-radius: 8px;
  border: 1px solid black;
  width: 100px;
  height: 30px;
  background-color: white;
  text-align: center;
  padding: 4px 10px;
  font-size: 20px;
  line-height: 20px;

  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #e53935;
    color: white;
  }
  @media screen and (max-width: 900px) {
    width: 60px;
    font-size: 14px;
  }
`
const cameraWidth = 360
const cameraHeight = 480
const aspectRatio = cameraWidth / cameraHeight

const videoConstraints = {
  width: {
    min: cameraWidth,
  },
  height: {
    min: cameraHeight,
  },
  aspectRatio,
}

const WebImg = styled.img`
  display: block;
  position: absolute;
  top: 80px;
`
const HoverDivide = styled(Divide)`
  flex-direction: column;
  align-items: center;
`

const HoverNote = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
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
  width: 100%;
  aspect-ratio: 0.68/1;
  object-fit: cover;
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

function PostUpload() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [pastProduct, setPastProduct] = useState()
  const [savedTag, setSavedTag] = useState()
  const [chooseTag, setChooseTag] = useState()
  const [cameraImg, setCameraImg] = useState(null)
  const [capturing, setCapturing] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [local, setLocal] = useState(true)
  const [camera, setCamera] = useState(false)
  const [isHover, setIsHover] = useState(true)
  const [isHoverCamera, setIsHoverCamera] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const webcamRef = useRef(null)
  // const uploadCamera = useRef(null)
  const [uploadCameraImage, setUploadCameraImage] = useState(null)
  const customizedTag = useRef()
  const [savedCustomizedTag, setSavedCustomizedTag] = useState([])
  const [pastPosts, setPastPosts] = useState()
  const [getUserProfile, setGetUserProfile] = useState(
    JSON.parse(window.localStorage.getItem('jwtToken')) || [],
  )

  function onImageChange(e) {
    setImages([...e.target.files])
    console.log(e.target.files[0])
  }
  const currImage = images[0]
  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = []
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])

  function addtagInput() {
    let newTag = []
    newTag.push(customizedTag.current.value)
    savedCustomizedTag.push(newTag)
    setSavedCustomizedTag([...savedCustomizedTag])
    console.log(savedCustomizedTag)
    customizedTag.current.value = ''
  }
  function deleteTag(key) {
    // let deleteIndex
    console.log(savedCustomizedTag)
    console.log(key)
    let newTag = savedCustomizedTag.filter((item, index) => index !== key)
    console.log(newTag)
    setSavedCustomizedTag(newTag)
  }

  console.log(savedCustomizedTag)

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      addtagInput()
    }
  }

  let jwtToken = window.localStorage.getItem('jwtToken')
  // // 儲存按過的select
  async function findProductTag() {
    const response = await fetch(`https://hazlin.work/api/1.0/orders`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      // console.log(await response.json())
      const productList = await response.json()
      setPastProduct(productList)
      if (pastProduct.list.length === 0) {
        console.log('沒有購買過商品')
        alert('須購買商品才可上傳您的時尚')
      } else {
        alert('快來成為時尚教主吧!')
      }
    }
  }

  const [checked, setChecked] = useState([])

  const chooseProductTag = (e) => {
    console.log(e.target.value)
    let updateList = [...checked]

    if (e.target.checked) {
      updateList = [...checked, e.target.value]
    } else {
      updateList.splice(checked.indexOf(e.target.value), 1)
    }
    setChecked(checked)
    console.log(checked)
  }

  async function uploadFile() {
    console.log(cameraImg, 'bbb')
    const base64Data = cameraImg
    console.log(base64Data)
    const base64DataResponse = await fetch(`${base64Data}`)
    const cameraBlob = await base64DataResponse.blob()
    setUploadCameraImage(cameraBlob)
    console.log('aaa')
    console.log(currImage)
    if (!base64Data && currImage === undefined) {
      alert('圖片不可為空')
    } else {
      var myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${getUserProfile.token}`)
      var formdata = new FormData()
      formdata.append('tags', JSON.stringify(savedCustomizedTag))
      formdata.append('camera_image', cameraBlob)
      formdata.append('upload_files', currImage)
      formdata.append(
        'products',
        '[{"pid":201902191247,"pName":"經典修身長筒牛仔褲"},{"pid":201902191245,"pName":"小扇紋質感上衣"}]',
      )
      return fetch(`https://hazlin.work/api/1.0/user/post`, {
        body: formdata,
        headers: myHeaders,
        method: 'POST',
      })
        .then((res) => {
          if (res.status === 200) {
            throw res.statusText
          }
          return res.json()
        })
        .then(alert('上傳成功'))
        .then(setSavedCustomizedTag([]))
        .then(({ data }) => console.log('data', data))
        .catch((err) => console.log('err', err))
    }
  }

  async function showMyPastPost() {
    setIsOpen((prevCheck) => !prevCheck)
    const response = await fetch(`https://hazlin.work/api/1.0/user/post`, {
      headers: new Headers({
        Authorization: `Bearer ${getUserProfile.token}`,
      }),
    })
    if (response.status === 200) {
      // console.log(await response.json())
      const pastPostList = await response.json()
      setPastPosts(pastPostList)
      console.log(pastPosts)
      if (pastPosts[0].posts.length === 0) {
        window.alert('您尚未帶起風潮')
        console.log('not yet post')
      } else if (pastPosts[0].posts.length !== 0) {
        console.log(123)
      }
    }
  }
  // console.log(pastPosts)

  const capture = () => {
    const cameraImg = webcamRef.current.getScreenshot()
    setCapturing(true)
    setCameraImg(cameraImg)
  }
  function deletecapture() {
    setCameraImg(null)
  }
  function LocalFile() {
    setLocal(true)
    setCamera(false)
  }
  function CameraFile() {
    setCamera(true)
    setLocal(false)
    // setImages()
  }
  const handleMouseOver1 = () => {
    setIsHover(true)
  }
  const handleMouseOut1 = () => {
    setIsHover(false)
  }
  const handleMouseOver2 = () => {
    setIsHoverCamera(true)
  }
  const handleMouseOut2 = () => {
    setIsHoverCamera(false)
  }

  return (
    <>
      <Wrapper>
        <Title>上傳你的自信穿搭</Title>
        <DisplayDivide>
          <UploadWay>
            <Displayflex>
              <HoverDivide>
                {isHover || local ? (
                  <HoverNote onClick>本地端</HoverNote>
                ) : null}
                <WayPicLocal
                  onClick={LocalFile}
                  onMouseOver={handleMouseOver1}
                  onMouseOut={handleMouseOut1}
                ></WayPicLocal>
              </HoverDivide>
              <HoverDivide>
                {isHoverCamera || camera ? <HoverNote>馬上拍</HoverNote> : null}
                <WayPicCamera
                  onClick={CameraFile}
                  onMouseOver={handleMouseOver2}
                  onMouseOut={handleMouseOut2}
                ></WayPicCamera>
              </HoverDivide>
            </Displayflex>
            {camera && (
              <>
                <Webcam
                  videoConstraints={videoConstraints}
                  width={100 + '%'}
                  height={80 + '%'}
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
                {cameraImg && <WebImg src={cameraImg} alt="screenshot" />}
                <Divide>
                  <ScreenBtn onClick={capture}>Capture photo</ScreenBtn>
                  <ScreenBtn onClick={deletecapture}>Delete photo</ScreenBtn>
                </Divide>
              </>
            )}
            {local && (
              <>
                <UploadPic>
                  {' '}
                  {imageURLs.map((imageSrc, index) => (
                    <UploadPhoto key={index} src={imageSrc} alt="uploadImage" />
                  ))}
                </UploadPic>
                <Tag
                  type="file"
                  multiple="multiple"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </>
            )}
          </UploadWay>
          <UploadWayTag>
            <UploadProduct>
              <DivideColumn>
                <Label>圖片所包含商品</Label>
                <Note>*必填|查找歷史購買產品</Note>
              </DivideColumn>
              {/* <FindProductTag>查找歷史購買產品</FindProductTag> */}
              <FindBtn onClick={findProductTag}>點選查找</FindBtn>
              {pastProduct &&
                pastProduct.list.map((list, key) => {
                  return (
                    <>
                      <TagDivide>
                        <ClickedTag
                          type="checkbox"
                          key={key}
                          value={list.ptitle}
                          onChange={chooseProductTag}
                          // checked="false"
                        />
                        <TagLabel name={list.ptitle}>{list.ptitle}</TagLabel>
                      </TagDivide>
                      <IDnote>productID：{list.product_id}</IDnote>
                    </>
                  )
                })}
            </UploadProduct>
            <CustomisedTag>
              <DivideColumn>
                <Label>加入商品名稱TAG</Label>
                <Note>可自行選擇填入</Note>
              </DivideColumn>
              <ShowTag>
                <PutTag type="text" ref={customizedTag} onKeyDown={onKeyDown} />
                <TagBtn onClick={addtagInput}>輸入</TagBtn>
              </ShowTag>
              {savedCustomizedTag &&
                savedCustomizedTag.map((tag, index) => {
                  return (
                    <>
                      <DeleteDivide key={index}>
                        <ShowTagList>{tag}</ShowTagList>
                        <DeleteBtn onClick={() => deleteTag(index)}>
                          Delete
                        </DeleteBtn>
                      </DeleteDivide>
                    </>
                  )
                })}
            </CustomisedTag>
          </UploadWayTag>
        </DisplayDivide>
        <UploadBtn onClick={uploadFile}>送出貼文</UploadBtn>
        <Title>我的潮流貼文</Title>
        <FindPostBtn onClick={showMyPastPost}>點選查看過往風流</FindPostBtn>
        <PostWrapper>
          {isOpen && pastPosts
            ? pastPosts[0].posts.map((item, id) => {
                return (
                  <Post key={id}>
                    <PostImage
                      src={item.postPic}
                      onClick={() => {
                        if (window.innerWidth > 412) {
                          console.log('click')
                          setIsActive(true)
                        }
                      }}
                    />
                    <PostIconWrapper>
                      <PostHeartIcon></PostHeartIcon>
                      <PostIconNumber>{item.hearts}</PostIconNumber>
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
export default PostUpload
