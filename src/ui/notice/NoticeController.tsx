import {FC, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Notice} from "../../data/model/notice";
import NoticeList from "./screen/NoticeList";
import NoticeSpecific from "./screen/NoticeSpecific";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WriteNotice from "./screen/WriteNotice";
import {getDatabase, ref, child, remove} from "firebase/database";
import {Menu} from "../dashboard/DashboardController";
import NoticeEdit from "./screen/NoticeEdit";

interface NoticeContentsProps {
  data: Notice[]
  fetchMenu: (menu:Menu) => void
}

const NoticeController: FC<NoticeContentsProps> = ({data, fetchMenu}) => {
  const [depth, setDepth] = useState<string>('list')
  const [selected, setSelected] = useState<Notice | null | undefined>(null)


  function onClickRow({param}: {param: Notice}) {
    setSelected(param)
    setDepth('specific')
  }

  function goFirst() {
    setDepth('list')
  }

  function goSpecific() {
    setDepth('specific')
  }

  function onClickCreate() {
    setDepth('create')
  }

  function onClickEdit() {
    setDepth('edit')
  }

  function onClickDelete() {
    const db = getDatabase();
    const dbRef = ref(db)

    if (!selected) {
      return alert('공지를 삭제할 수 없습니다. 공지를 다시 선택해주세요.')
    }

    remove(child(dbRef, `notice/${selected.uid}`))
      .then(() => {
        goFirst()
        fetchMenu(Menu.notice)
        alert('공지사항이 삭제되었습니다.')
      })
      .catch((reason) => {
        console.error(reason)
        alert('공지를 삭제하는 데 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <NoticeList data={data} onClickRow={onClickRow}/>
      case 'specific': return <NoticeSpecific data={selected!} goBack={goFirst}/>
      case 'create': return <WriteNotice goBack={goFirst} fetchMenu={fetchMenu} />
      case 'edit': return <NoticeEdit data={selected!} goBack={goSpecific} fetchMenu={fetchMenu} />
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
            onClick={onClickCreate}
          >
            공지 추가
          </Button>
        )
      case 'specific':
        return (
          <>
            {/*// TODO: 수정*/}
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
        <Grid minWidth="100vh" container sx={{}}>
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
            <Paper sx={{width: '100vh', p: 5, flexDirection: 'column'}}>
              {contentsProvider()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default NoticeController
