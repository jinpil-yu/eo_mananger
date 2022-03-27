import Data from "./Data";
import {Schedule} from "./schedule";

class ScheduleList implements Data {
  list: Schedule[] = []

  sort() {
    this.list.sort((a,b) => {
      const cur = (new Date(a.whenstart)).getTime()
      const before = (new Date(b.whenstart)).getTime()

      if(cur < before) return 1;
      if(cur > before) return -1;
      if(cur === before) return 0;
      return 0;
    })
  }
}

export default ScheduleList
