import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {FC} from "react";
import {Notice} from "../../../data/model/notice";
import Title from "../../dashboard/Title";
import {getDate} from "../../../util/date";

interface NoticeListComponentProps {
  data: Notice[]
  onClickRow: ({param}: {param: Notice}) => void
}

const NoticeList: FC<NoticeListComponentProps> = ({data, onClickRow}) => {
  return (
    <React.Fragment>
      <Title>Notice</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell width={100} align={"center"}>제목</TableCell>
            <TableCell width={100} align={"center"}>마지막 수정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Notice, index: number) => (
            <TableRow
              key={`notice_${index}`}
              onClick={() =>
                onClickRow({param: row})
              }
            >
              <TableCell align={"center"}>{row.title}</TableCell>
              <TableCell align={"center"}>{getDate(row.updateTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default NoticeList
