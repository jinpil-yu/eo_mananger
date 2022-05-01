import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../dashboard/Title';
import {FC} from "react";
import {Member} from "../../../data/model/member";

interface MembersProps {
  data: Member[]
  onClickRow: ({param}: {param: Member}) => void
}

const MemberList: FC<MembersProps> = ({data, onClickRow}) => {
  return (
    <React.Fragment>
      <Title>Members</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell width={250} align={"center"}>이름&nbsp;</TableCell>
            <TableCell width={350} align={"center"}>회사&nbsp;</TableCell>
            <TableCell width={250} align={"center"}>직책&nbsp;</TableCell>
            <TableCell width={250} align={"center"}>포럼&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Member, index: number) => {
              return (
                <TableRow
                  key={`members}_${index}`}
                  onClick={() =>
                    onClickRow({param: row})
                  }
                >
                  <TableCell align={"center"}>{row.name}</TableCell>
                  <TableCell align={"center"}>{row.companyName}</TableCell>
                  <TableCell align={"center"}>{row.jobPosition}</TableCell>
                  <TableCell align={"center"}>{row.forum}</TableCell>
                </TableRow>
              )
            }
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default MemberList
