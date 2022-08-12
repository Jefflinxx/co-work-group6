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
  justify-content: center;
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
  text-align: left;
`
const UploadWayTag = styled(UploadWay)`
  width: 30%;
  margin-left: 24px;
`
const UploadProduct = styled(UploadWay)`
  height: 50%;
`
const CustomisedTag = styled(UploadWay)`
  height: 50%;
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
`
const Tag = styled.input`
  font-size: 24px;
  margin-bottom: 12px;
`
const Label = styled.label`
  font-size: 24px;
  margin-bottom: 12px;
`
const PutTag = styled.input`
  ${'' /* text-align: center; */}
  font-size: 20px;
  line-height: 20px;

  border: 1px solid black;
  border-radius: 4px;
  height: 60px;
  padding: 20px;
  width: 100%;
`
const ChooseBtn = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid black;
  height: 60px;
  border-radius: 4px;

  margin-top: 20px;
  padding: 16px;

  position: relative;
`
const ChooseFile = styled.label`
  position: absolute;
  right: 0;
  top: 0;

  background-color: #8b572a;
  height: 58px;
  padding: 16px;
  width: 30%;

  border-radius: 0px 4px 4px 0px;

  color: white;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
`

function Upload() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  function onImageChange(e) {
    setImages([...e.target.files])
  }

  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = []
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])

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
            <ChooseBtn>
              <Tag
                type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}
              />
              Choose File
              <Label
                type="file"
                multiple
                accept="image/*"
                onChange={onImageChange}
              >
                Browse
              </Label>
            </ChooseBtn>
          </UploadWay>
          <UploadWayTag>
            <UploadProduct>
              <Label>圖片所包含商品</Label>
              <PutTag placeholder="前開衩扭結洋裝" />
            </UploadProduct>
            <CustomisedTag>
              <Label>加入商品名稱TAG</Label>
              <PutTag type="text"></PutTag>
            </CustomisedTag>
          </UploadWayTag>
        </Divide>
      </Wrapper>
    </>
  )
}
export default Upload
