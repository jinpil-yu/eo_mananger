import React, {FC, useEffect, useState} from "react";
import {
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  useMediaQuery
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../dashboard/Title";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Notice} from "../../data/model/notice";
import {getDate} from "../../util/date";
import {getStorage, getDownloadURL,ref, listAll} from "firebase/storage";
import {useTheme} from "@mui/material/styles";
import EoImageList from "../common/ImageList";

interface NoticeSpecificProps {
  data: Notice
  goBack: () => void
}

const NoticeSpecific: FC<NoticeSpecificProps> = ({ data, goBack }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<{img: string, title: string}>({
    img: '', title: ''
  })
  const [images, setImages] = useState<{img: string, title: string}[]>([])
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    getImageUrl()
  }, [])

  function getImageUrl() {
    try {
      const storage = getStorage();
      const path = `notice/${data.uid}`
      const pathReference = ref(storage, path)

      listAll(pathReference)
        .then(async (res) => {
          let imageUrlList: {img: string, title: string}[] = []

          for (let itemRef of res.items) {
            await getDownloadURL(itemRef).then((url) => {
              imageUrlList.push({
                  img: url,
                  title: 'image',
              })
            })
          }
          setImages(imageUrlList)
        })
        .catch((err) => console.error(err))
    } catch (e) {
      console.error(e)
    }
  }

  const handleClickOpen = (item: {img: string, title: string}) => {
    setSelectedImage(item)
    setOpen(true)
  }


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      <Title>{data.title ? data.title : "-" }</Title>
      <Table size="medium">
        <TableRow>
          <TableCell width={100} variant="head" align={'center'}>글쓴이&nbsp;</TableCell>
          <TableCell width={200} align={'center'}>{data.author ? data.author : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>업데이트 날짜&nbsp;</TableCell>
          <TableCell align={'center'}>{getDate(data.updateTime)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>내용&nbsp;</TableCell>
          <TableCell align={'center'}>{data.body ? data.body : "-" }</TableCell>
        </TableRow>
      </Table>
      <EoImageList itemData={images} onClick={handleClickOpen}/>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <img
          src={`${selectedImage.img}`}
          alt={selectedImage.title}
          loading={'lazy'}
        />
      </Dialog>
    </React.Fragment>
  )
}

export default NoticeSpecific
