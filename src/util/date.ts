import {format} from "date-fns";

export function getDate(strDate: string): string {
  return format(new Date(strDate), "yyyy년 MM월 dd일 HH시 mm분")
}
