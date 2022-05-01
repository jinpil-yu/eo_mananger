import React, {FC, useState} from "react";
import {Member} from "../../../data/model/member";
import Title from "../../dashboard/Title";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Dialog, IconButton, useMediaQuery} from "@mui/material";
import EoImageList, {EoImage} from "../../common/ImageList";
import {useTheme} from "@mui/material/styles";

interface MemberSpecificProps {
  uid: string
  data: Member
  goBack: () => void
}

const MemberSpecific: FC<MemberSpecificProps> = ({uid, data, goBack}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<EoImage>({
    img: '', title: ''
  })
  const [itemData] = useState<EoImage[]>([{
    img: data.thumbnail,
    title: 'thumbnail'
  }])
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
      <Title>{data.name}</Title>
      <EoImageList itemData={itemData} onClick={handleClickOpen}/>
      <Table size="medium">
        <TableRow>
          <TableCell variant="head">등급&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.grade ? data.grade : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">전화번호&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.phone ? data.phone : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">이메일&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.email ? data.email : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">주소&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.address ? data.address : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">이메일&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.email ? data.email : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">분야&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.jobField ? data.jobField : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">회사&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.companyName ? data.companyName : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">직책&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.jobPosition ? data.jobPosition : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">포럼&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.forum ? data.forum : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">SIG&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.sig ? data.sig : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">휴면&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.status ? data.status : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">비서 이름&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.secretary.name ? data.secretary.name : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">비서 전화번호&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.secretary.phone ? data.secretary.phone : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">비서 이메일&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.secretary.email ? data.secretary.email : "-" }</TableCell>
        </TableRow>
      </Table>
    </React.Fragment>
  )
}

export default MemberSpecific
