import * as React from 'react';
import {FC, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton, Slide, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import {format} from "date-fns";
import {getDatabase, ref, set} from "firebase/database";
import {Member} from "../../../data/model/member";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import Alert from "@mui/material/Alert";
import {Menu} from "../../dashboard/DashboardController";

interface AddressFormProps {
  goBack: () => void
  fetch: (menu:Menu) => void
}

interface AuthInfo {
  email: string
  pw: string
  pw2: string
}

interface EoError {
  visible: boolean
  message: string
}

const SignIn: FC<AddressFormProps> = ({goBack, fetch}) => {
  const [error, setError] = useState<EoError>({
    visible: false,
    message: "",
  })
  const [singInInfo, setSingInInfo] = useState<AuthInfo>({
    email: "",
    pw: "",
    pw2: "",
  })
  const [newMember, setNewMember] = useState<Member>({
    uid: "",
    address : "",
    birthDate : "",
    companyName : "",
    companyPhone: "",
    email : "",
    forum : "",
    grade : "",
    jobField : "",
    jobPosition : "",
    name : "",
    phone : "",
    secretary : {
      name: "",
      phone: "",
      email: "",
    },
    sig : "",
    status : "",
    thumbnail : "",
    updateTime : "",
  })

  function signIn({email, pw}: {email: string, pw: string}): Promise<string> {
    return new Promise<string>(((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          resolve(userCredential.user.uid)
        })
        .catch((error) => {
          reject(error)
        });
    }))
  }

  function register(uid: string) {
    const now = format(new Date(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx")
    const db = getDatabase();

    const param = {
      address : newMember?.address ?? "",
      birthDate : newMember?.birthDate ?? "",
      companyName : newMember?.companyName ?? "",
      companyPhone: newMember?.companyPhone ?? "",
      email : newMember?.email ?? "",
      forum : newMember?.forum ?? "",
      grade : "korea",
      jobField : newMember?.jobField ?? "",
      jobPosition : newMember?.jobPosition ?? "",
      name : newMember?.name ?? "",
      phone : newMember?.phone ?? "",
      secretary : {
        name: newMember.secretary?.name ?? "",
        phone: newMember.secretary?.phone ?? "",
        email: newMember.secretary?.email ?? "",
      },
      sig : newMember?.sig ?? "",
      status : 'active',
      thumbnail : newMember?.thumbnail ?? "",
      updateTime : now,
    }

    set(ref(db, 'members/' + uid), param)
      .then(() => {
        fetch(Menu.member)
        alert('?????? ????????? ?????????????????????.')
        goBack()
      }).catch((err) => {
      console.error(err)
    });
  }

  function handleSubmitCreate() {
    const {email, pw, pw2} = singInInfo
    const {name, phone, birthDate, address, companyName, companyPhone, jobField, jobPosition } = newMember

    if (email === "") { return alert("???????????? ??????????????????") }
    if (pw === "") { return alert("??????????????? ??????????????????.") }
    if (pw !== pw2) { return alert("??? ??????????????? ???????????? ????????????.") }
    if (name === "") { return alert("????????? ??????????????????.") }
    if (phone === "") { return alert("??????????????? ??????????????????.") }
    if (birthDate === "") { return alert("??????????????? ??????????????????.") }
    if (address === "") { return alert("????????? ??????????????????.") }
    if (companyName === "") { return alert("???????????? ??????????????????.")}
    if (jobField === "") { return alert("????????? ??????????????????.")}
    if (jobPosition === "") { return alert("????????? ??????????????????.")}

    signIn({email: email, pw: pw})
      .then((uid: string) => {
        register(uid)
      }).catch((err) => {
        setError({
          visible: true,
          message: err.message,
        })
      })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingInInfo({
      ...singInInfo,
      email: event.target.value
    });

    setNewMember({
      ...newMember,
      email: event.target.value
    })
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingInInfo({
      ...singInInfo,
      pw: event.target.value
    });
  };
  const handleSecondPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingInInfo({
      ...singInInfo,
      pw2: event.target.value
    });
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      address: event.target.value
    });
  };
  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      birthDate: event.target.value
    });
  };
  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      companyName: event.target.value
    });
  };
  const handleCompanyPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      companyPhone: event.target.value
    });
  };
  const handleForumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      forum: event.target.value
    });
  };
  const handleSIGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      sig: event.target.value
    });
  };
  const handleJobFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      jobField: event.target.value
    });
  };
  const handleJobPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      jobPosition: event.target.value
    });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      name: event.target.value
    });
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      phone: event.target.value
    });
  };
  const handleSecretaryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      secretary: {
        ...newMember.secretary,
        name: event.target.value
      }
    });
  };
  const handleSecretaryPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      secretary: {
        ...newMember.secretary,
        phone: event.target.value
      }
    });
  };
  const handleSecretaryEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      secretary: {
        ...newMember.secretary,
        email: event.target.value
      }
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        key={"topcenter"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error.visible}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        autoHideDuration={15000}
        onClose={() => setError({...error, visible: false})}
      >
        <Alert onClose={()=> setError({...error, visible: false})} severity="error" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Button
          sx={{ bottom: 20}}
          color={'primary'}
          type="submit"
          variant="contained"
          onClick={handleSubmitCreate}
        >
          ??????
        </Button>
      </Grid>
      <Typography variant="h6" gutterBottom>
        ?????? ??????
      </Typography>
      <Typography mt={6} mb={3} color={'disabled'} variant="subtitle1"  gutterBottom>
        ????????????
      </Typography>
      <Grid container spacing={3} columns={1}>
        <Grid item xs={12} sm={10}>
          <TextField
            sx={{
              width: 300
            }}
            required
            id="email"
            name="email"
            label="?????????"
            autoComplete={'email'}
            variant="standard"
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12} columns={2}>
          <TextField
            sx={{
              width: 300
            }}
            type="password"
            required
            fullWidth
            id="pw"
            name="pw"
            label="???????????? (6?????? ??????, ?????? ?????? ??????)"
            autoComplete={'password'}
            variant="standard"
            onChange={handlePasswordChange}
          />
          <TextField
            sx={{
              ml: 5,
              width: 300
            }}
            type="password"
            required
            fullWidth
            id="pw"
            name="pw"
            label="???????????? ?????????"
            autoComplete={'password'}
            variant="standard"
            onChange={handleSecondPasswordChange}
          />
        </Grid>
        <Grid item xs={12} columns={2}>
          <TextField
            sx={{
              width: 300,
            }}
            required
            fullWidth
            id="name"
            name="name"
            label="??????"
            autoComplete={'name'}
            variant="standard"
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12} columns={2}>
          <TextField
            sx={{
              width: 300,
            }}
            required
            fullWidth
            id="phone"
            name="phone"
            label="???????????? (000-0000-0000 ????????????)"
            autoComplete={'phone'}
            variant="standard"
            onChange={handlePhoneChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: 300
            }}
            required
            fullWidth
            id="birthDate"
            name="birthDate"
            label="????????????"
            autoComplete={'birthDate'}
            variant="standard"
            onChange={handleBirthDateChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: 300
            }}
            required
            fullWidth
            id="address"
            name="address"
            label="??????"
            autoComplete={'address'}
            variant="standard"
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: 300
            }}
            fullWidth
            id="forum"
            name="forum"
            label="??????"
            autoComplete={'forum'}
            variant="standard"
            onChange={handleForumChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{
              width: 300
            }}
            fullWidth
            id="forum"
            name="forum"
            label="SIG"
            autoComplete={'forum'}
            variant="standard"
            onChange={handleSIGChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} columns={2}>
          <TextField
            sx={{
              width: 300
            }}
            required
            fullWidth
            id="companyName"
            name="companyName"
            label="????????????"
            autoComplete={'companyName'}
            variant="standard"
            onChange={handleCompanyNameChange}
          />
          <TextField
            sx={{
              width: 300,
              ml: 5
            }}
            fullWidth
            id="companyPhone"
            name="companyPhone"
            label="?????? ????????????"
            autoComplete={'companyPhone'}
            variant="standard"
            onChange={handleCompanyPhoneChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} columns={2}>
          <TextField
            sx={{
              width: 300
            }}
            required
            fullWidth
            id="jobField"
            name="jobField"
            label="??????"
            autoComplete={'jobField'}
            variant="standard"
            onChange={handleJobFieldChange}
          />
          <TextField
            sx={{
              width: 300,
              ml: 5
            }}
            required
            fullWidth
            id="jobPosition"
            name="jobPosition"
            label="??????"
            autoComplete={'jobPosition'}
            variant="standard"
            onChange={handleJobPositionChange}
          />
        </Grid>
      </Grid>
      <Typography mt={8} mb={2} color={"disabled"} variant="subtitle1" gutterBottom>
        ??????
      </Typography>
      <Grid container spacing={3} columns={2}>
        <Grid item xs={12} sm={6} columns={2}>
          <TextField
            sx={{
              width: 300
            }}
            fullWidth
            id="securityName"
            name="securityName"
            label="??????"
            autoComplete={'securityName'}
            variant="standard"
            onChange={handleSecretaryNameChange}
          />
          <TextField
            sx={{
              width: 300,
              ml: 5
            }}
            fullWidth
            id="securityPhone"
            name="securityPhone"
            label="????????????"
            autoComplete={'securityPhone'}
            variant="standard"
            onChange={handleSecretaryPhoneChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} columns={2}>
          <TextField
            sx={{
              width: 300,
            }}
            fullWidth
            id="securityEmail"
            name="securityEmail"
            label="?????????"
            autoComplete={'securityEmail'}
            variant="standard"
            onChange={handleSecretaryEmailChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default SignIn
