export const year = "YY"
export const month = "MM"
export const day = "DD"
export const hour = "HH"
export const minute = "mm"
export const seconds = "ss"

export type DTFormat = {
  yearMonth: string
  yearMonthZh: string
  date: string
  time: string
  dateTime: string
  dateMinute: string
  hourMinute: string
  monthDay: string
}

export function createDTFormat({ dateDelimiter = "-", timeDelimiter = ":" }: { dateDelimiter?: string; timeDelimiter?: string } = {}): DTFormat {
  const yearMonth = [year + year, month].join(dateDelimiter)
  const yearMonthZh = [year + year, "年", month, "月"].join("")
  const date = [year + year, month, day].join(dateDelimiter)
  const monthDay = [month, day].join(dateDelimiter)
  const time = [hour, minute, seconds].join(timeDelimiter)
  const dateTime = date + " " + time
  const dateMinute = date + " " + hour + timeDelimiter + minute
  const hourMinute = hour + timeDelimiter + minute

  return {
    yearMonth,
    yearMonthZh,
    date,
    time,
    dateTime,
    dateMinute,
    hourMinute,
    monthDay,
  }
}

export const defDTFormat = createDTFormat()
