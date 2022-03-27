import Data from "./Data";
import {Contact} from "./contact";

class ContactList implements Data {
  list: Contact[] = []

  sort(): void {
    console.log('Note:// function sort not work in ContactList Instance. because this instance has only one item.')
  }
}

export default ContactList
