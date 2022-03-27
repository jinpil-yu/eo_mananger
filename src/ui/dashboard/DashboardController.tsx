import * as React from 'react';
import {useEffect, useState} from "react";
import {getDatabase, ref, child, get} from "firebase/database"
import DashboardScreen from "./DashboardContents";
import MemberList from "../../data/model/MemberList";
import NoticeList from "../../data/model/NoticeList";
import Data from "../../data/model/Data";
import {Notice} from "../../data/model/notice";
import {Member} from "../../data/model/member";
import ScheduleList from "../../data/model/ScheduleList";
import {Schedule} from "../../data/model/schedule";
import ContactList from "../../data/model/ContactList";
import {Contact} from "../../data/model/contact";

export enum Menu {member = 'members', notice = 'notice', schedule = 'schedules', contact = 'contactus'}

export default function DashboardController() {
  const db = getDatabase();
  const dbRef = ref(db)
  const [loading, setLoading] = useState<boolean>(false)
  const [model, setModel] = useState<Data | undefined | null>(null)
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    onSelectMenu(Menu.member)
  }, [])

  function onSelectMenu(currentMenu: Menu) {
    setLoading(true)

    get(child(dbRef, currentMenu))
      .then((snapshot) => {
        if (snapshot.exists()) {
          switch (currentMenu) {
            case Menu.member:
              let members = new MemberList()
              let memberList: Member[] = Object.values(snapshot.val())
              let keyList: string[] = Object.keys(snapshot.val())
              for(let index=0; index < memberList.length; index+=1) {
                memberList[index].uid = keyList[index]
              }
              members.list = memberList
              members.sort()
              setModel(members)
              return
            case Menu.notice:
              let notices = new NoticeList()
              let noticeList: Notice[] = Object.values(snapshot.val())
              let noticeKeyList: string[] = Object.keys(snapshot.val())
              for(let index=0; index < noticeList.length; index+=1) {
                noticeList[index].uid = noticeKeyList[index]
              }
              notices.list = noticeList
              notices.sort()
              setModel(notices)
              return
            case Menu.schedule:
              let schedules = new ScheduleList()
              let scheduleList: Schedule[] = Object.values(snapshot.val())
              let scheduleKeyList: string[] = Object.keys(snapshot.val())
              for(let index=0; index < scheduleList.length; index+=1) {
                scheduleList[index].uid = scheduleKeyList[index]
              }
              schedules.list = scheduleList
              schedules.sort()
              setModel(schedules)
              return
            case Menu.contact:
              let contacts = new ContactList()
              let contactList: Contact = snapshot.val()
              contacts.list = [contactList]
              setModel(contacts)
              return
          }
        } else {
          console.error(`No data /${currentMenu}`)
          setModel(null)
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err, null, 2))
        setModel(undefined)
      })
      .finally(() => setLoading(false))
  }

  return <DashboardScreen open={open} loading={loading} model={model} onSelectMenu={onSelectMenu} onToggleDrawer={() => setOpen(!open)}/>;
}
