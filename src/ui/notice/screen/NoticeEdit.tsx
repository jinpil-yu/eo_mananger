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
import {getStorage, getDownloadURL,ref, listAll, deleteObject} from "firebase/storage";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {format} from "date-fns";
import * as DB from "firebase/database";
import * as Stroage from "firebase/storage";
import {Menu} from "../dashboard/DashboardController";
import DeleteIcon from '@mui/icons-material/Delete';

interface NoticeEditProps {
  data: Notice
  goBack: () => void
  fetchMenu: (menu:Menu) => void
}

const NoticeEdit: FC<NoticeEditProps> = ({data, goBack, fetchMenu}) => {
  const [newNotice, setNewNotice] = useState<Notice>({
    uid: '',
    title: '',
    author: 'EO admin',
    body: '',
    updateTime: ''
  })
  const [preImages, setPreImages] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [deleteImages, setDeleteImages] = useState<string[]>([])

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

    const db = DB.getDatabase();
    const updates = {
      [`notice/${newNotice.uid}/title`]: newNotice.title,
      [`notice/${newNotice.uid}/body`]: newNotice.body,
      [`notice/${newNotice.uid}/updateTime`]: format(new Date(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx")
    };

    DB.update(DB.ref(db), updates)
      .then(() => {
        const storage = Stroage.getStorage();
        const metadata = {
          contentType: 'image/jpeg',
        };

        if (preImages.length === 0 && deleteImages.length > 0) {
          deleteImages.forEach((item) => {
            const deleteRef = Stroage.ref(storage, `/notice/${newNotice.uid}/${item}.jpg`);
            deleteObject(deleteRef)
              .then(() => {
                fetchMenu(Menu.notice)
                alert('공지사항 수정이 완료 되었습니다.')
                goBack()
              })
          })
          return
        }

        preImages.forEach((image: ImageType, index: number) => {
          if (!image.file) {
            return
          }
          const firstRef = Stroage.ref(storage, `/notice/${newNotice.uid}/${index}.jpg`);
          Stroage.uploadBytes(firstRef, image.file as Blob, metadata)
        })
        fetchMenu(Menu.notice)
        alert('공지사항 수정이 완료 되었습니다.')
        goBack()
      }).catch(() => {

      });
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
    console.log(insertIndex)
    newImage[insertIndex] = imageList[0]
    setPreImages([...newImage]);
  };

  const handleImageClick = (index: number, onImageUpload: () => void) => {
    setSelectedIndex(index)
    onImageUpload()
  }

  const selectImageType = (image: any) => {
    if (!image) {
      return "NONE"
    }

    if (image?.file) {
      return "LOCAL"
    }

    if (image?.title) {
     return "CLOUD"
    }

    return "ERROR"
  }

  const UploadedImage = ({image, index}: {image: any, index: number}) => {
    return (
      <img
        style={{
          width: 'auto',
          maxWidth: 230,
          height: '100%',
        }}
        src={`${image.dataURL}`}
        alt={`${index}`}
        loading="lazy"
      />
    )
  }

  const AddPhoto = ({image, index, onClick}:{image: any, index: number, onClick: (index: number) => void }) => {
    const imageType = selectImageType(image)

    switch (imageType) {
      case "NONE":
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
      case "LOCAL":
        return (
          <Grid
            item
            alignItems={'center'}
            justifyContent="center"
            width={230}
            height={230}
            sx={{
              border: '2px solid',
              borderColor: '#999999'
            }}
            onClick={() => onClick(index)}
          >
            <UploadedImage image={image} index={index} />
          </Grid>
        )
      case "CLOUD":
        return (
          <Grid
            item
            alignItems={'center'}
            justifyContent="center"
            width={230}
            height={230}
            sx={{
              border: '2px solid',
              borderColor: '#999999'
            }}
            onClick={() => onClick(index)}
          >
            <UploadedImage image={image} index={index} />
          </Grid>
        )
      case "ERROR":
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
            <ErrorOutlineIcon color='action' sx={{width: '100%', height: '100%'}}/>
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
          저장
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
                <AddPhoto image={preImages[0]} index={0} onClick={() => handleImageClick(0, onImageUpload)} />
              </ImageListItem>
              <ImageListItem key={`image_${1}`}>
                <AddPhoto image={preImages[1]} index={1} onClick={() => handleImageClick(1, onImageUpload)} />
              </ImageListItem>
              <ImageListItem key={`image_${2}`}>
                <AddPhoto image={preImages[2]} index={2} onClick={() => handleImageClick(2, onImageUpload)} />
              </ImageListItem>
            </ImageList>
          )}
        </ImageUploading>
      </Grid>
      <Grid
        container
        justifyContent="center"
      >
        <Grid item xs={4}>
          <Button
            style={{
              marginLeft: 42,
            }}
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={() => {
              if (preImages.length < 1) {
                return
              }

              const removed = preImages.splice(0, 0)
              deleteImages.push('0')
              console.log(deleteImages)
              setDeleteImages([...deleteImages])
              setPreImages([...removed])
            }}
          >
          첫번째 사진 삭제
          </Button>
        </Grid>
        <Grid item xs={4} justifyContent={'center'}>
          <Button
            style={{
              marginLeft: 43,
            }}
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={() => {
              if (preImages.length < 2) {
                return
              }

              const removed = preImages.splice(1, 0)
              deleteImages.push('1')
              console.log(deleteImages)
              setDeleteImages([...deleteImages])
              setPreImages([...removed])
            }}
          >
            두번째 사진 삭제
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            style={{
              marginLeft: 45,
            }}
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={() => {
              if (preImages.length < 3) {
                return
              }

              const removed = preImages.splice(2, 0)
              deleteImages.push('2')
              console.log(deleteImages)
              setDeleteImages([...deleteImages])
              setPreImages([...removed])
            }}
          >
            세번째 사진 삭제
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default NoticeEdit
