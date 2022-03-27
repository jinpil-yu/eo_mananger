import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import {FC} from "react";
import {Schedule} from "../../data/model/schedule";
import {format} from "date-fns";
import {Notice} from "../../data/model/notice";

interface ScheduleListProps {
  data: Schedule[]
  onClickRow: ({param}: {param: Schedule}) => void
}

const ScheduleListComponent: FC<ScheduleListProps> = ({data, onClickRow}) => {
  function getDate(strDate: string): string {
    return format(new Date(strDate), "yyyy년 MM월 dd일 HH시 mm분")
  }

  return (
    <React.Fragment>
      <Title>Schedule</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell width={400} align={"center"}>일시</TableCell>
            <TableCell width={400} align={"center"}>제목</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Schedule, index: number) => (
            <TableRow
              key={`notice_${index}`}
              onClick={() =>
                onClickRow({param: row})
              }
            >
              <TableCell align={"center"}>{getDate(row.whenstart)}</TableCell>
              <TableCell align={"center"}>{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default ScheduleListComponent
