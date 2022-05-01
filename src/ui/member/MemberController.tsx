import {FC, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Member} from "../../data/model/member";
import MemberListComponent from "./screen/MemberList";
import MemberSpecific from "./screen/MemberSpecific";
import DeleteIcon from '@mui/icons-material/Delete';
import SignIn from "./screen/SignIn";
import {child, getDatabase, ref, remove} from "firebase/database";
import {Menu} from "../dashboard/DashboardController";
import DumpSignIn from "./screen/DumpSignIn";
import EditWholeUser from "./screen/EditWholeUser";
import MemberEdit from "./screen/MemberEdit";
import EditIcon from "@mui/icons-material/Edit";

interface MemberContentsProps {
  data: Member[]
  fetch: (menu:Menu) => void
}

const MemberController: FC<MemberContentsProps> = ({data, fetch}) => {
  const [depth, setDepth] = useState<string>('list')
  const [selected, setSelected] = useState<Member | null | undefined>(null)

  function onClickRow({param}: {param: Member}) {
    setSelected(param)
    setDepth('specific')
  }

  function goFirst() {
    setDepth('list')
  }

  function onPressCreateBtn() {
    setDepth('create')
  }

  function onPressDumpBtn() {
    setDepth('dump')
  }

  function onPressEditWholeUserField() {
    setDepth('wholeUser')
  }


  function onClickDelete() {
    const db = getDatabase();
    const dbRef = ref(db)

    if (!selected) {
      return alert('유저를 삭제할 수 없습니다. 새로고침 후 다시 선택해주세요.')
    }


    remove(child(dbRef, `members/${selected.uid}`))
      .then(() => {
        fetch(Menu.member)
        goFirst()
        alert('유저가 삭제되었습니다.')
      })
      .catch((reason) => {
        console.error(reason)
        alert('유저를 삭제하는 데 실패했습니다. 잠시 후 다시 시도해주세요.')
      })
  }

  function onClickEdit() {
    setDepth('edit')
  }

  function contentsProvider() {
    switch (depth) {
      case 'list': return <MemberListComponent data={data} onClickRow={onClickRow}/>
      case 'specific': return <MemberSpecific uid={""} data={selected!} goBack={goFirst}/>
      case 'create': return <SignIn goBack={goFirst} fetch={fetch}/>
      case 'dump': return <DumpSignIn />
      case 'edit': return <MemberEdit selected={selected!} goBack={goFirst} fetch={fetch}/>
      case 'wholeUser': return <EditWholeUser goBack={goFirst} />
      case 'delete': return <></>
    }
  }

  function buttonProvider() {
    switch (depth) {
      case 'list':
        return (
          <>
            <Button
              startIcon={<AddIcon/>}
              type="submit"
              variant="contained"
              onClick={onPressCreateBtn}
            >
              회원 추가
            </Button>
            {/*<Button*/}
            {/*  startIcon={<AddIcon/>}*/}
            {/*  color="error"*/}
            {/*  sx={{ml: 1}}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*  onClick={onPressDumpBtn}*/}
            {/*>*/}
            {/*  CSV 파일로 추가*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  startIcon={<AddIcon/>}*/}
            {/*  color="error"*/}
            {/*  sx={{ml: 1}}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*  onClick={onPressEditWholeUserField}*/}
            {/*>*/}
            {/*  전체 유저 필드 수정*/}
            {/*</Button>*/}
          </>
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

export default MemberController