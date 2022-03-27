import Data from "./Data";
import {Notice} from "./notice";

class NoticeList implements Data {
  list: Notice[] = []

  sort() {
    this.list.sort((a,b) => {
      let current = new Date(a.updateTime)
      let before = new Date(b.updateTime)

      if(current < before) return 1;
      if(current > before) return -1;
      if(current === before) return 0;
      return 0;
    })
  }
}

export default NoticeList
