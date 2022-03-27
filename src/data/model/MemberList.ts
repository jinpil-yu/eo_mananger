import Data from "./Data";
import {Member} from "./member";

class MemberList implements Data {
  list: Member[] = []

  sort() {
    this.list.sort((a,b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      if(a.name === b.name) return 0;
      return 0;
    })
  }
}

export default MemberList
