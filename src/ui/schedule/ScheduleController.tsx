import React, {FC, useState} from 'react'
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import {Schedule} from "../../data/model/schedule";
import {Menu} from "../dashboard/DashboardController";
import ScheduleList from "./screen/ScheduleList";
import ScheduleDetail from "./screen/ScheduleDetail";
import ScheduleCreate from "./screen/CreateSchedule";
import {child, getDatabase, ref, remove} from "firebase/database";
import NoticeEdit from "../notice/screen/NoticeEdit";
import ScheduleEdit from "./screen/ScheduleEdit";
import * as Storage from "firebase/storage";
import {deleteObject} from "firebase/storage";

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

  function onClickEdit() {
    setDepth('edit')
  }

  function onClickDelete() {
    const db = getDatabase();
    const dbRef = ref(db)
    const storage = Storage.getStorage();
    const firstRef = Storage.ref(storage, `/schedule/${selected?.uid}/0.jpg`);
    const secondRef = Storage.ref(storage, `/schedule/${selected?.uid}/1.jpg`);
    const thirdRef = Storage.ref(storage, `/schedule/${selected?.uid}/2.jpg`);

    if (!selected) {
      return alert('일정을 삭제할 수 없습니다. 새로고침 후에 다시 시도해주세요.')
    }

    remove(child(dbRef, `schedules/${selected.uid}`))
      .then(() => {
        deleteObject(firstRef)
          .catch((err) => {
            console.error(err)
          })
        deleteObject(secondRef)
          .catch((err) => {
            console.error(err)
          })
        deleteObject(thirdRef)
          .catch((err) => {
            console.error(err)
          })

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
      case 'list': return <ScheduleList data={data} onClickRow={onClickRow}/>
      case 'specific': return <ScheduleDetail data={selected!} goBack={goFirst}/>
      case 'create': return <ScheduleCreate goBack={goFirst} fetch={fetch}/>
      case 'edit': return <ScheduleEdit data={selected!} goBack={goFirst} fetch={fetch} />
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
            <Button
              sx={{mr: 1}}
              startIcon={<EditIcon/>}
              type="submit"
              variant="contained"
              onClick={onClickEdit}
            >
              수정
            </Button>
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
