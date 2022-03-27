import React, {FC, useEffect, useState} from 'react'
import {Schedule} from '../../data/model/schedule'
import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {getDate} from "../../util/date";
import {useTheme} from "@mui/material/styles";
import EoImageList, {EoImage} from "../common/ImageList";
import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";

interface ScheduleDetailProps {
  data: Schedule
  goBack: () => void
}

const ScheduleDetail: FC<ScheduleDetailProps> = ({data, goBack}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<EoImage>({
    img: '', title: ''
  })
  const [itemData, setItemData] = useState<EoImage[]>([])
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    getImageUrl()
  }, [])

  function getImageUrl() {
    try {
      const storage = getStorage();
      const path = `schedule/${data.uid}`
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
          setItemData(imageUrlList)
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
      <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      <Table size="medium">
        <TableRow>
          <TableCell variant="head" align={'center'}>일시&nbsp;</TableCell>
          <TableCell align={'center'}>{getDate(data.whenstart)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>내용&nbsp;</TableCell>
          <TableCell align={'center'}>{data.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>상세 설명 &nbsp;</TableCell>
          <TableCell width={700} align={'center'}>{data.body ? data.body : "-" }</TableCell>
        </TableRow>
      </Table>
      <EoImageList itemData={itemData} onClick={handleClickOpen}/>
    </React.Fragment>
  )
}

export default ScheduleDetail
