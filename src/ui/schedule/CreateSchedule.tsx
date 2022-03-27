import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton, ImageList, ImageListItem} from "@mui/material";
import {FC, useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddAPhotoIcon from '@mui/icons-material/AddAPhotoSharp';
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import Button from "@mui/material/Button";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import {Schedule} from "../../data/model/schedule";
import {format} from "date-fns";
import {getDatabase, ref, set} from "firebase/database";
import {uuid} from "../../util/uuid";
import * as Stroage from "firebase/storage";
import ImageUploading, {ImageListType, ImageType} from "react-images-uploading";
import AddIcon from "@mui/icons-material/Add";

interface CreateScheduleProps {
  goBack: () => void
}

const CreateSchedule: FC<CreateScheduleProps> = ({goBack}) => {
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    uid: '',
    title: '',
    body: '',
    whenstart: format(new Date(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx"),
  })
  const [images, setImages] = useState([])

  function handleSubmitCreate() {
    if (newSchedule.title === "") {
      alert("제목을 입력해 주세요.")
      return
    }

    if (newSchedule.body === "") {
      alert("본문 내용을 입력해 주세요.")
      return
    }

    const db = getDatabase();
    const UUID = uuid()

    const param = {
      title: newSchedule.title,
      body: newSchedule.body,
      whenstart: newSchedule.whenstart,
    }

    set(ref(db, 'schedules/' + UUID), param)
      .then(() => {
        const storage = Stroage.getStorage();
        const metadata = {
          contentType: 'image/jpeg',
        };

        images.forEach((image: ImageType, index: number) => {
          const firstRef = Stroage.ref(storage, `/schedule/${UUID}/${index}.png`);
          Stroage.uploadBytes(firstRef, image.file as Blob, metadata)
        })

        alert('일정 등록이 완료 되었습니다.')
      }).catch((err) => {
      console.error(err)
    });
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule({
      ...newSchedule,
      title: event.target.value
    });
  };

  const handleWhenStartChange = (newValue: Date | null) => {
    if (!newValue) {
      alert("날짜를 다시 선택해주세요.")
      return
    }

    const whenstart = format(newValue!, "yyyy-MM-dd'T'hh:mm:ss.SSSxxx")

    setNewSchedule({
      ...newSchedule,
      whenstart: whenstart
    });  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule({
      ...newSchedule,
      body: event.target.value
    });
  };

  const handleImageChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

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
          value={images}
          onChange={handleImageChange}
          maxNumber={3}
        >
          {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
            <ImageList sx={{ width: '100%' }} cols={4} rowHeight={150}>
              <ImageListItem key={`image_${0}`}>
                <Grid
                  item
                  alignItems={'center'}
                  justifyContent="center"
                  width={150}
                  height={150}
                  padding={5}
                  sx={{
                    border: '2px solid',
                    borderColor: '#999999'
                  }}
                  onClick={onImageUpload}
                >
                  <AddIcon color='action' sx={{width: '100%',height: '100%'}}/>
                </Grid>
              </ImageListItem>
              <UploadImageList itemData={imageList} onClickUpload={onImageUpload}/>
            </ImageList>
          )}
        </ImageUploading>
      </Grid>
    </React.Fragment>
  );
}

interface UploadImageListProps {
  itemData: ImageType[]
  onClickUpload: any
}

const UploadImageList: FC<UploadImageListProps> = ({itemData}) => {
  return (
    <>
      {itemData.map((item, index) =>
        <ImageListItem key={`image_${index}`}>
          <img
            style={{
              width: 150,
              height: 150,
              border: '0.8px solid',
              borderColor: '#999999'
            }}
            src={`${item.dataURL}`}
            alt={`${index}`}
            loading="lazy"
          />
        </ImageListItem>
      )
      }
    </>
  );
}

export default CreateSchedule