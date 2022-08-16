import { useEffect, useState, useRef } from 'react'
import Camera from './Camera.png'
import Local from './Upload File.png'
import Webcam from 'react-webcam'
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
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;

  width: 80%;
  color: black;
  background-color: #edc187;
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
  position: absolute;
  top: 500px;
`
const HoverDivide = styled(Divide)`
  flex-direction: column;
  align-items: center;
`

const HoverNote = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
`
function PostUpload() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [pastProduct, setPastProduct] = useState([])
  const [savedTag, setSavedTag] = useState([])
  const [cameraImg, setCameraImg] = useState(null)
  const [capturing, setCapturing] = useState(false)
  const [local, setLocal] = useState(true)
  const [camera, setCamera] = useState(false)
  const [isHover, setIsHover] = useState(true)
  const [isHoverCamera, setIsHoverCamera] = useState(false)
  const webcamRef = useRef(null)
  const uploadCamera = useRef(null)
  const [uploadCameraImage, setUploadCameraImage] = useState(null)
  const customizedTag = useRef()
  const [savedCustomizedTag, setSavedCustomizedTag] = useState([])
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
    newTag = []
  }
  // function deleteTag(key) {
  //   // let deleteIndex
  //   console.log(456)
  //   setsavedCustomizedTag(savedCustomizedTag.filter((item) => item.key !== key))
  // }
  function onKeyDown(e) {
    if (e.key === 'Enter') {
      addtagInput()
    }
  }

  const list = [
    { pid: 201902191247, pName: '經典修身長筒牛仔褲' },
    { pid: 201902191245, pName: '小扇紋質感上衣' },
  ]

  // // 儲存按過的select
  async function showProductTag() {
    const response = await fetch(`https://hazlin.work/api/1.0/orders`, {
      headers: new Headers({
        Authorization: `Bearer ${uploadTokenInfo}`,
      }),
    })
    console.log(await response.json())
    let buyLists = await response.json()
    let buyList = await buyLists.list
    console.log(buyList)

    // if (buyList.length > 0) {
    //   setPastProduct(buyList)
    // }

    // if()
    // let savedTag = []
    // let currentTag = productTag.current.value
    // console.log(productTag.current.value)
    // savedTag.push(currentTag)
    // setSavedTag([productTag.current.value, ...savedTag])
    // console.log(savedTag)
  }

  let uploadToken = JSON.parse(window.localStorage.getItem('jwtToken'))
  let uploadTokenInfo = uploadToken.token
  async function uploadFile() {
    // if()
    const base64Data = cameraImg
    const base64DataResponse = await fetch(`${base64Data}`)
    const cameraBlob = await base64DataResponse.blob()
    console.log(cameraBlob)
    if (!base64DataResponse || !currImage) {
      alert('圖片不可為空')
    } else {
      var myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${uploadTokenInfo}`)
      var formdata = new FormData()
      formdata.append('upload_files', currImage)
      formdata.append('tags', JSON.stringify(savedCustomizedTag))
      // formdata.append('camera_image', cameraBlob)
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
        .then(({ data }) => console.log('data', data))
        .catch((err) => console.log('err', err))
    }
  }
  const capture = () => {
    const cameraImg = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    })
    console.log(cameraImg)
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
        <Divide>
          <UploadWay>
            <Divide>
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
            </Divide>
            {camera && (
              <>
                <Webcam
                  videoConstraints={videoConstraints}
                  width={cameraWidth}
                  height={cameraHeight}
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
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                />
              </>
            )}
          </UploadWay>
          <UploadWayTag>
            <UploadProduct>
              <Label>圖片所包含商品</Label>
              <Note>*必填</Note>
              <ShowTag onClick={showProductTag}>請選擇圖片所含商品</ShowTag>
              {pastProduct !== [] ? (
                pastProduct.map((list, key) => {
                  return (
                    <>
                      <option
                        key={key}
                        value={list}
                        // onChange={showProductTag}
                      >
                        {list}
                      </option>
                    </>
                  )
                })
              ) : (
                <Note>您尚未買過任何商品</Note>
              )}
            </UploadProduct>
            <CustomisedTag>
              <Label>加入商品名稱TAG</Label>
              <Note>可自行選擇填入</Note>
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
                        <DeleteBtn onClick>Delete</DeleteBtn>
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
export default PostUpload
