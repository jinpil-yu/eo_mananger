import React, {FC} from 'react'
import {Contact} from "../../data/model/contact";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

interface ContactDetailProps {
  data: Contact
}

const ContactDetail: FC<ContactDetailProps> = ({data}) => {
  return (
    <React.Fragment>
      <Table size="medium">
        <TableRow>
          <TableCell variant="head" align={'center'}>메니저&nbsp;</TableCell>
          <TableCell width={500} align={'center'}>{data.manager}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>주소&nbsp;</TableCell>
          <TableCell align={'center'}>{data.address ? data.address : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>이메일&nbsp;</TableCell>
          <TableCell align={'center'}>{data.email ? data.email : "-" }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>전화번호&nbsp;</TableCell>
          <TableCell align={'center'}>{data.tel}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>전화번호2&nbsp;</TableCell>
          <TableCell align={'center'}>{data.tel2 ? data.tel2 : "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head" align={'center'}>노트&nbsp;</TableCell>
          <TableCell align={'center'}>{data.note ? data.note : "-" }</TableCell>
        </TableRow>
      </Table>
    </React.Fragment>
  )
}

export default ContactDetail
