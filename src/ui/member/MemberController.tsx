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
import {child, getDatabase, ref, remove, update} from "firebase/database";
import {Menu} from "../dashboard/DashboardController";
import DumpSignIn from "./screen/DumpSignIn";
import EditWholeUser from "./screen/EditWholeUser";
import MemberEdit from "./screen/MemberEdit";
import EditIcon from "@mui/icons-material/Edit";
import HideImageIcon from '@mui/icons-material/HideImage';
import * as Storage from "firebase/storage";
import {deleteObject} from "firebase/storage";
import {format} from "date-fns";

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


  function onClickDeleteUser() {
    const db = getDatabase();
    const dbRef = ref(db)
    const storage = Storage.getStorage();
    const deleteSubRef = Storage.ref(storage, `/user/${selected?.uid}/sub.jpg`);
    const deleteMainRef = Storage.ref(storage, `/user/${selected?.uid}/main.jpg`);


    if (!selected) {
      return alert('????????? ????????? ??? ????????????. ???????????? ??? ?????? ??????????????????.')
    }

    remove(child(dbRef, `members/${selected.uid}`))
      .then(() => {
        deleteObject(deleteMainRef)
          .catch((err) => {
            console.error(err)
          })
        deleteObject(deleteSubRef)
          .catch((err) => {
            console.error(err)
          })
        fetch(Menu.member)
        goFirst()
        alert('????????? ?????????????????????.')
      })
      .catch((reason) => {
        console.error(reason)
        alert('????????? ???????????? ??? ??????????????????. ?????? ??? ?????? ??????????????????.')
      })
  }

  function onClickDeleteProfileImage() {
    const db = getDatabase();
    const storage = Storage.getStorage();
    const deleteSubRef = Storage.ref(storage, `/user/${selected?.uid}/sub.jpg`);
    const deleteMainRef = Storage.ref(storage, `/user/${selected?.uid}/main.jpg`);

    const now = format(new Date(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx")

    const param = {
      address : selected?.address ?? "",
      birthDate : selected?.birthDate ?? "",
      companyName : selected?.companyName ?? "",
      companyPhone: selected?.companyPhone ?? "",
      email : selected?.email ?? "",
      forum : selected?.forum ?? "",
      grade : "korea",
      jobField : selected?.jobField ?? "",
      jobPosition : selected?.jobPosition ?? "",
      name : selected?.name ?? "",
      phone : selected?.phone ?? "",
      secretary : {
        name: selected?.secretary?.name ?? "",
        phone: selected?.secretary?.phone ?? "",
        email: selected?.secretary?.email ?? "",
      },
      sig : selected?.sig ?? "",
      status : 'active',
      thumbnail : "",
      updateTime : now,
    }

    update(ref(db, `members/${selected?.uid}`), param)
      .then(() => {
        deleteObject(deleteMainRef)
          .catch((err) => {
          console.error(err)
        })
        deleteObject(deleteSubRef)
          .catch((err) => {
          console.error(err)
        })

        fetch(Menu.member)
        alert('????????? ????????? ????????? ?????????????????????.')
        goFirst()
      }).catch((err) => {
      console.error(err)
    });
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
              ?????? ??????
            </Button>
            {/*<Button*/}
            {/*  startIcon={<AddIcon/>}*/}
            {/*  color="error"*/}
            {/*  sx={{ml: 1}}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*  onClick={onPressDumpBtn}*/}
            {/*>*/}
            {/*  CSV ????????? ??????*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  startIcon={<AddIcon/>}*/}
            {/*  color="error"*/}
            {/*  sx={{ml: 1}}*/}
            {/*  type="submit"*/}
            {/*  variant="contained"*/}
            {/*  onClick={onPressEditWholeUserField}*/}
            {/*>*/}
            {/*  ?????? ?????? ?????? ??????*/}
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
              ??????
            </Button>
            <Button
              sx={{mr: 1}}
              color={'warning'}
              startIcon={<HideImageIcon />}
              type="submit"
              variant="contained"
              onClick={onClickDeleteProfileImage}
            >
              ????????? ?????? ??????
            </Button>
            <Button
              color={'error'}
              startIcon={<DeleteIcon/>}
              type="submit"
              variant="contained"
              onClick={onClickDeleteUser}
            >
              ??????
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
