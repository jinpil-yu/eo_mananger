import React, {FC, useEffect, useState} from 'react'
import {Schedule} from "../../../data/model/schedule";
import { Menu } from '../../dashboard/DashboardController';
import {deleteObject, getDownloadURL, getStorage, listAll, ref} from "firebase/storage";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import Grid from "@mui/material/Grid";
import {IconButton, ImageList, ImageListItem} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhoto from '../../common/AddPhoto';
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {getDatabase} from "firebase/database";
import * as DB from "firebase/database";
import * as Storage from "firebase/storage";
import {format} from "date-fns";

interface ScheduleEditProps {
  data: Schedule
  goBack: () => void
  fetch: (menu: Menu) => void
}

const ScheduleEdit: FC<ScheduleEditProps> = ({data, goBack, fetch}) => {
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    uid: '',
    title: '',
    body: '',
    whenstart: ''
  })
  const [preImages, setPreImages] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [deleteImages, setDeleteImages] = useState<string[]>([])

  useEffect(() => {
    setNewSchedule(data)
    getImageUrl()
  }, [])

  function getImageUrl() {
    try {
      const storage = getStorage();
      const path = `schedule/${data.uid}`
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
    if (newSchedule.title === "") {
      alert("제목을 입력해 주세요.")
      return
    }

    if (newSchedule.body === "") {
      alert("본문 내용을 입력해 주세요.")
      return
    }

    const newDate = new Date(newSchedule.whenstart)
    const whenstart = `${newDate.getFullYear()}-${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}T${newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours()}:${newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes()}:00.000+09:00`

    const updates = {
      [`schedules/${newSchedule.uid}/title`]: newSchedule.title,
      [`schedules/${newSchedule.uid}/body`]: newSchedule.body,
      [`schedules/${newSchedule.uid}/whenstart`]: whenstart,
    };

    console.log(updates)

    const db = getDatabase();

    DB.update(DB.ref(db), updates)
      .then(() => {
        const storage = Storage.getStorage();
        const metadata = {
          contentType: 'image/jpeg',
        };

        if (preImages.length === 0 && deleteImages.length > 0) {
          deleteImages.forEach((item) => {
            console.log(`/schedule/${newSchedule.uid}/${item}.jpg`)
            const deleteRef = Storage.ref(storage, `/schedule/${newSchedule.uid}/${item}.jpg`);
            deleteObject(deleteRef)
              .then(() => {
                fetch(Menu.schedule)
                alert('스케쥴 수정이 완료 되었습니다.')
                goBack()
              })
          })
          return
        }

        preImages.forEach((image: ImageType, index: number) => {
          if (!image.file) {
            return
          }
          const firstRef = Storage.ref(storage, `/schedule/${newSchedule.uid}/${index}.jpg`);
          Storage.uploadBytes(firstRef, image.file as Blob, metadata)
        })
        fetch(Menu.schedule)
        alert('스케쥴 수정이 완료 되었습니다.')
        goBack()
      }).catch((reason) => {
        alert(reason)
      });
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule({
      ...newSchedule,
      title: event.target.value
    });
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule({
      ...newSchedule,
      body: event.target.value
    });
  };

  const handleWhenStartChange = (newValue: Date | null) => {
    if (!newValue) {
      alert("날짜를 다시 선택해주세요.")
      return
    }

    setNewSchedule({
      ...newSchedule,
      whenstart: newValue.toISOString()
    });
  };

  const handleImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    const newImage = preImages
    const insertIndex = preImages.length < selectedIndex ? preImages.length : selectedIndex
    newImage[insertIndex] = imageList[0]
    setPreImages([...newImage]);
  };

  const handleImageClick = (index: number, onImageUpload: () => void) => {
    setSelectedIndex(index)
    onImageUpload()
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
            value={`${newSchedule.title}`}
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
        <Grid item xs={12} sm={10}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date&Time picker"
              value={newSchedule.whenstart}
              onChange={handleWhenStartChange}
              renderInput={(params) => <TextField variant="standard" {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} columns={2}>
          <TextField
            value={`${newSchedule.body}`}
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
      <Grid container>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          onClick={() => {
            if (preImages.length < 1) {
              return
            }

            const deleteIndex = ['0', '1', '2']
            setDeleteImages(deleteIndex)
            setPreImages([])
          }}
        >
          전체 사진 삭제
        </Button>
      </Grid>
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
    </React.Fragment>
  )
}

export default ScheduleEdit
