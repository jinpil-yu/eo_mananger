import * as React from 'react';
import {FC, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton, Slide, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import {format} from "date-fns";
import {getDatabase, ref, update} from "firebase/database";
import {Member} from "../../../data/model/member";
import Alert from "@mui/material/Alert";
import {Menu} from "../../dashboard/DashboardController";

interface AddressFormProps {
  selected: Member
  goBack: () => void
  fetch: (menu:Menu) => void
}

interface EoError {
  visible: boolean
  message: string
}

const MemberEdit: FC<AddressFormProps> = ({selected, goBack, fetch}) => {
  const [error, setError] = useState<EoError>({
    visible: false,
    message: "",
  })
  const [member, setMember] = useState<Member>(selected)

  function editDb(uid: string) {
    const now = format(new Date(), "yyyy-MM-dd'T'hh:mm:ss.SSSxxx")
    const db = getDatabase();

    const param = {
      address : member?.address ?? "",
      birthDate : member?.birthDate ?? "",
      companyName : member?.companyName ?? "",
      companyPhone: member?.companyPhone ?? "",
      email : member?.email ?? "",
      forum : member?.forum ?? "",
      grade : "korea",
      jobField : member?.jobField ?? "",
      jobPosition : member?.jobPosition ?? "",
      name : member?.name ?? "",
      phone : member?.phone ?? "",
      secretary : {
        name: member.secretary?.name ?? "",
        phone: member.secretary?.phone ?? "",
        email: member.secretary?.email ?? "",
      },
      sig : member?.sig ?? "",
      status : 'active',
      thumbnail : member?.thumbnail ?? "",
      updateTime : now,
    }
    
    update(ref(db, 'members/' + uid), param)
      .then(() => {
        fetch(Menu.member)
        alert('유저 생성이 완료되었습니다.')
        goBack()
      }).catch((err) => {
      console.error(err)
    });
  }

  function handleSubmitCreate() {
    const {uid, email, name, phone, birthDate, address, companyName, companyPhone, jobField, jobPosition } = member

    console.log(member)

    if (email === "") { return alert("이메일을 입력해주세요") }
    if (name === "") { return alert("이름을 입력해주세요.") }
    if (phone === "") { return alert("전화번호를 입력해주세요.") }
    if (birthDate === "") { return alert("생년월일을 입력해주세요.") }
    if (address === "") { return alert("주소를 입력해주세요.") }
    if (companyName === "") { return alert("회사명을 입력해주세요.")}
    if (companyPhone === "") { return alert("회사 전화번호를 입력해주세요.")}
    if (jobField === "") { return alert("분야를 입력해주세요.")}
    if (jobPosition === "") { return alert("직책을 입력해주세요.")}

    editDb(uid)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      email: event.target.value
    })
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      address: event.target.value
    });
  };
  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      birthDate: event.target.value
    });
  };
  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      companyName: event.target.value
    });
  };
  const handleCompanyPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      companyPhone: event.target.value
    });
  };
  const handleForumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      forum: event.target.value
    });
  };
  const handleSIGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      sig: event.target.value
    })
  }
  const handleJobFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      jobField: event.target.value
    });
  };
  const handleJobPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      jobPosition: event.target.value
    });
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      name: event.target.value
    });
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      phone: event.target.value
    });
  };
  const handleSecretaryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      secretary: {
        ...member.secretary,
        name: event.target.value
      }
    });
  };
  const handleSecretaryPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      secretary: {
        ...member.secretary,
        phone: event.target.value
      }
    });
  };
  const handleSecretaryEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      secretary: {
        ...member.secretary,
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
          수정
        </Button>
      </Grid>
      <Typography variant="h6" gutterBottom>
        회원 수정
      </Typography>
      <Typography mt={6} mb={3} color={'disabled'} variant="subtitle1"  gutterBottom>
        회원정보
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
            label="이메일"
            autoComplete={'email'}
            variant="standard"
            value={member.email}
            onChange={handleEmailChange}
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
            label="이름"
            autoComplete={'name'}
            variant="standard"
            value={member.name}
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
            label="전화번호 (000-0000-0000 형식으로)"
            autoComplete={'phone'}
            variant="standard"
            value={member.phone}
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
            label="생년월일"
            autoComplete={'birthDate'}
            variant="standard"
            value={member.birthDate}
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
            label="주소"
            autoComplete={'address'}
            variant="standard"
            value={member.address}
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
            label="포럼"
            autoComplete={'forum'}
            variant="standard"
            value={member.forum}
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
            label="회사이름"
            autoComplete={'companyName'}
            variant="standard"
            value={member.companyName}
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
            label="회사 전화번호"
            autoComplete={'companyPhone'}
            variant="standard"
            value={member.companyPhone}
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
            label="분야"
            autoComplete={'jobField'}
            variant="standard"
            value={member.jobField}
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
            label="직책"
            autoComplete={'jobPosition'}
            variant="standard"
            value={member.jobPosition}
            onChange={handleJobPositionChange}
          />
        </Grid>
      </Grid>
      <Typography mt={8} mb={2} color={"disabled"} variant="subtitle1" gutterBottom>
        비서
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
            label="이름"
            autoComplete={'securityName'}
            variant="standard"
            value={member.secretary.name}
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
            label="전화번호"
            autoComplete={'securityPhone'}
            variant="standard"
            value={member.secretary.phone}
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
            label="이메일"
            autoComplete={'securityEmail'}
            variant="standard"
            value={member.secretary.email}
            onChange={handleSecretaryEmailChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default MemberEdit
