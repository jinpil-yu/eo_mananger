import React, {FC, useState} from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Schedule} from "../../data/model/schedule";
import ScheduleListComponent from "./ScheduleListComponent";
import ScheduleDetail from "./ScheduleDetail";
import ScheduleCreate from "./CreateSchedule";
import {child, getDatabase, ref, remove} from "firebase/database";
import {Menu} from "../dashboard/DashboardController";

interface ScheduleControllerProps {
  data: Schedule[]
  fetch: (menu: Menu) => void
}

const ScheduleController: FC<ScheduleControllerProps> = ({data, fetch}) => {
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

  function onClickDelete() {
    const db = getDatabase();
    const dbRef = ref(db)

    if (!selected) {
      return alert('일정을 삭제할 수 없습니다. 새로고침 후에 다시 시도해주세요.')
    }

    console.log(selected)

    remove(child(dbRef, `schedules/${selected.uid}`))
      .then(() => {
        goFirst()
        fetch(Menu.schedule)
        alert('일정이 삭제되었습니다.')
      })
      .catch((reason) => {
        console.error(reason)
        alert('일정을 삭제하는 데 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <ScheduleListComponent data={data} onClickRow={onClickRow}/>
      case 'specific': return <ScheduleDetail data={selected!} goBack={goFirst}/>
      case 'create': return <ScheduleCreate goBack={goFirst} fetch={fetch}/>
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
              onClick={onClickDelete}
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
