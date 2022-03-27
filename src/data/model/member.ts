export interface Secretary {
  email: string
  name: string
  phone: string
}

export type Member = {
  uid: string
  address : string
  birthDate : string
  companyName : string
  companyPhone: string
  email : string
  forum : string
  grade : string
  jobField : string
  jobPosition : string
  name : string
  phone : string
  secretary : Secretary
  sig : string,
  status : string
  thumbnail : string
  updateTime : string
}
