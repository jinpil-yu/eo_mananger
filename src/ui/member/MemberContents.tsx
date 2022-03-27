import {FC, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Member} from "../../data/model/member";
import MemberListComponent from "./MemberListComponent";
import EditIcon from '@mui/icons-material/Edit';
import MemberSpecific from "./MemberSpecific";
import DeleteIcon from '@mui/icons-material/Delete';
import SignIn from "./SignIn";

interface MemberContentsProps {
  data: Member[]
}

const MemberContents: FC<MemberContentsProps> = ({data}) => {
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

  function contentsProvider() {
    switch (depth) {
      case 'list': return <MemberListComponent data={data} onClickRow={onClickRow}/>
      case 'specific': return <MemberSpecific uid={""} data={selected!} goBack={goFirst}/>
      case 'create': return <SignIn goBack={goFirst} />
      case 'update': return <SignIn goBack={goFirst}/>
      case 'delete': return <></>
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
            onClick={onPressCreateBtn}
          >
            회원 추가
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

export default MemberContents
