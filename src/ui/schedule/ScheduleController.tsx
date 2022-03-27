import React, {FC, useState} from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Schedule} from "../../data/model/schedule";
import ScheduleListComponent from "./ScheduleListComponent";
import ScheduleDetail from "./ScheduleDetail";
import ScheduleCreate from "./CreateSchedule";

interface ScheduleControllerProps {
  data: Schedule[]
}

const ScheduleController: FC<ScheduleControllerProps> = ({data}) => {
  const [depth, setDepth] = useState<string>('list')
  const [selected, setSelected] = useState<Schedule | null | undefined>(null)

  function onClickRow({param}: {param: Schedule}) {
    setSelected(param)
    setDepth('specific')
  }

  function goFirst() {
    setDepth('list')
  }

  function onClickCreateBtn() {
    setDepth('create')
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <ScheduleListComponent data={data} onClickRow={onClickRow}/>
      case 'specific': return <ScheduleDetail data={selected!} goBack={goFirst}/>
      case 'create': return <ScheduleCreate goBack={goFirst} />
    }
  }

  function buttonProvider() {
    switch (depth) {
      case 'list':
        return (
          <Button
            startIcon={<AddIcon/>}
            type="submit"
            variant="contained"
            onClick={onClickCreateBtn}
          >
            일정 추가
          </Button>
        )
      case 'specific':
        return (
          <>
            {/*<Button*/}
            {/*  sx={{mr: 1}}*/}
            {/*  startIcon={<EditIcon/>}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*>*/}
            {/*  수정*/}
            {/*</Button>*/}
            <Button
              color={'error'}
              startIcon={<DeleteIcon/>}
              type="submit"
              variant="contained"
            >
              삭제
            </Button>
          </>
        )
      default: return <></>
    }
  }


  return (
    <>
      <Toolbar/>
      <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
        <Grid container>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{mb: 3}}
            >
              {buttonProvider()}
            </Grid>
            <Paper sx={{width: '100%', p: 5, flexDirection: 'column'}}>
              {contentsProvider()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ScheduleController
