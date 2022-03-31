import React, {FC, useEffect, useState} from 'react'
import { Notice } from '../../data/model/notice'
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import Grid from "@mui/material/Grid";
import {IconButton, ImageList, ImageListItem} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {getStorage, getDownloadURL,ref, listAll} from "firebase/storage";

interface NoticeEditProps {
  data: Notice
  goBack: () => void
}

const NoticeEdit: FC<NoticeEditProps> = ({data, goBack}) => {
  const [newNotice, setNewNotice] = useState<Notice>({
    uid: '',
    title: '',
    author: 'EO admin',
    body: '',
    updateTime: ''
  })
  const [preImages, setPreImages] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    setNewNotice(data)
    getImageUrl()
  }, [])

  function getImageUrl() {
    try {
      const storage = getStorage();
      const path = `notice/${data.uid}`
      const pathReference = ref(storage, path)

      listAll(pathReference)
        .then(async (res) => {
          let imageUrlList: {dataURL: string, title: string}[] = []

          for (let itemRef of res.items) {
            await getDownloadURL(itemRef).then((url) => {
              imageUrlList.push({
                dataURL: url,
                title: 'image',
              })
            })
          }

          setPreImages(imageUrlList)
        })
        .catch((err) => console.error(err))
    } catch (e) {
      console.error(e)
    }
  }

  function handleSubmitCreate() {
    if (newNotice.title === "") {
      alert("제목을 입력해 주세요.")
      return
    }

    if (newNotice.body === "") {
      alert("본문 내용을 입력해 주세요.")
      return
    }
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNotice({
      ...newNotice,
      title: event.target.value
    });
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNotice({
      ...newNotice,
      body: event.target.value
    });
  };

  const handleImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    const newImage = preImages
    const insertIndex = preImages.length < selectedIndex ? preImages.length : selectedIndex
    newImage[insertIndex] = imageList[0]

    console.log(newImage)
    setPreImages(Object(newImage));
  };

  const handleImageClick = (index: number, onImageUpload: () => void) => {
    setSelectedIndex(index)
    onImageUpload()
  }

  function addOrPhoto(list: any[], index: number, onClick: (index: number) => void) {
    console.log('rerender')
    if (!list[index]) {
      return (
        <Grid
          item
          alignItems={'center'}
          justifyContent="center"
          width={230}
          height={230}
          padding={8}
          sx={{
            border: '2px solid',
            borderColor: '#999999'
          }}
          onClick={() => onClick(index)}
        >
          <AddIcon color='action' sx={{width: '100%', height: '100%'}}/>
        </Grid>
      )
    }
  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          sx={{ bottom: 20}}
          color={'primary'}
          type="submit"
          variant="contained"
          onClick={handleSubmitCreate}
        >
          생성
        </Button>
      </Grid>
      <Grid container spacing={3} columns={1}>
        <Grid item xs={12} sm={10}>
          <TextField
            value={`${newNotice.title}`}
            sx={{
              width: 300
            }}
            required
            id="title"
            name="title"
            label="제목"
            autoComplete={'title'}
            variant="standard"
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item xs={12} columns={2}>
          <TextField
            value={`${newNotice.body}`}
            sx={{
              width: 600
            }}
            multiline
            rows={20}
            required
            fullWidth
            id="body"
            name="body"
            label="본문"
            autoComplete={'body'}
            variant="standard"
            onChange={handleBodyChange}
          />
        </Grid>
      </Grid>
      <Typography mt={4} mb={1} variant="subtitle1"  gutterBottom fontWeight={'400'}>
        이미지 (최대 3장)
      </Typography>
      <Grid spacing={100} direction={'row'}>
        <ImageUploading
          multiple
          value={[]}
          onChange={handleImageChange}
          maxNumber={3}
        >
          {({
            onImageUpload,
          }) => (
            <ImageList sx={{ width: '100%' }} cols={3} rowHeight={230}>
              <ImageListItem key={`image_${0}`}>
                {addOrPhoto(preImages, 0, () => handleImageClick(0, onImageUpload))}
              </ImageListItem>
              <ImageListItem key={`image_${1}`}>
                {addOrPhoto(preImages, 1, () => handleImageClick(1, onImageUpload))}
              </ImageListItem>
              <ImageListItem key={`image_${2}`}>
                {addOrPhoto(preImages, 2, () => handleImageClick(2, onImageUpload))}
              </ImageListItem>
            </ImageList>
          )}
        </ImageUploading>
      </Grid>
    </React.Fragment>
  )
}

export default NoticeEdit
