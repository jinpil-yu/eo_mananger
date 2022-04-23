import CSVReader, {IFileInfo} from "react-csv-reader";
import React from "react";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {format} from "date-fns";
import {getDatabase, get, ref, set} from "firebase/database";
import {Menu} from "../dashboard/DashboardController";

interface CSVInput {
  address: string
  sig: string
  arg1: string
  arg2: string
  arg3: string
  arg4: string
  arg5: string
  birthDate: string
  companyName: string
  companyPhone: string
  email: string
  familyName: string
  forum: string
  givenName: string
  id: string
  jobField: string
  jobPosition: string
  name: string
  phone: string
  secretaryEmail: string
  secretaryName: string
  secretaryPhone: string
  state: string
}

const DumpSignIn = () => {
  function handleCSV(data: any[], fileInfo: IFileInfo) {
    const users: CSVInput[] = data
    const signInErrList: CSVInput[] = []

    // users.find((item, index) => {
    //   const param: any = {
    //     "address": item.address,
    //     "birthDate": item.birthDate,
    //     "companyName": item.companyName,
    //     "email": item.email,
    //     "forum": item.forum,
    //     "grade": "korea",
    //     "jobField": item.jobField,
    //     "jobPosition": item.jobPosition,
    //     "name": item.name,
    //     "phone": item.phone,
    //     "secretary": {
    //       "email": item.secretaryEmail,
    //       "name": item.secretaryName,
    //       "phone": item.secretaryPhone
    //     },
    //     "sig": item.sig,
    //     "status": "active",
    //     "thumbnail": "",
    //     "updateTime": "2022-04-04T 23:50:00.000+09:00"
    //   }
    //   console.log(`${index}: name={${item.name}} id={${item.id}} pw={${item.phone.replaceAll('-', '')}}`)
    // })


    const db = getDatabase()
    get(ref(db, 'members/')).then((members) => {
      members.forEach((member) => {
        try {
          const item = users.find((user) => user.name === member.val()['name'])

          register({
            name: item?.secretaryName,
            email: item?.secretaryEmail,
            phone: item?.secretaryPhone
          }, member.key ?? "--")
        } catch (e) {
          console.error({user: member.val(), reason: e})
        }
      })
    })
  }

  function register(param: any, uid: string) {
    const db = getDatabase();

    set(ref(db, 'members/' + uid + '/secretary'), param)
      .then(() => {
        // fetch(Menu.member)
      }).catch((err) => {
        console.error({
          errorUser: param,
          reason: err
        })
    });
  }

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

  return (<React.Fragment>
    <CSVReader
      parserOptions={{ header: true }}
      onFileLoaded={handleCSV}
    />
  </React.Fragment>)
}

export default DumpSignIn
