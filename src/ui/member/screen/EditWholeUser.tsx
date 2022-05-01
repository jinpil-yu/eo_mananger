import React from 'react'
import {Grid, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {child, get, getDatabase, ref, update} from "firebase/database";
import CSVReader, {IFileInfo} from "react-csv-reader";

interface CSVInput {
  name: string
  forum: string
  Sig: string
  industry: string
}

interface EditWholeUserProps {
  goBack: () => void
}

export default function EditWholeUser(props: EditWholeUserProps) {
  const { goBack } = props

  function handleCSV(data: any[], fileInfo: IFileInfo) {
    // 1. csv 파일로 테이블 만들기
    const users: CSVInput[] = data

    const db = getDatabase();
    const dbRef = ref(db)

    console.log(users)

    get(child(dbRef, 'members'))
      .then((snapShot) => {
        if (snapShot.exists()) {
          let index = 0
          let errCount = 0

          snapShot.forEach((item) => {
            // 2. 현재 정보와 테이블을 이름으로 비교
            let findItem = users.find((csvTableItem) => {
              return csvTableItem.name.replace(" ", "") === item.val().name
            })

            if (!findItem) {
              errCount += 1
            } else {
              console.log(item.val().name)
              index += 1
            }

            // 3. 업데이트
            const updates = {
              [`members/${item.key}/forum`]: findItem?.forum ?? "",
              [`members/${item.key}/sig`]: findItem?.Sig ?? "",
              [`members/${item.key}/jobField`]: findItem?.industry ?? "",
            }

            console.log(updates)

            update(ref(db), updates).then((result) => console.log(result)).catch((reason => {console.log(reason)}))
          })

          console.log('SUCCESS:', index)
          console.log('WTF!:', errCount)
        }
      })

  }

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton color={'primary'} sx={{ bottom: 20,right: 20}} onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <CSVReader
          parserOptions={{ header: true }}
          onFileLoaded={handleCSV}
        />
      </Grid>
    </React.Fragment>
  )
}
