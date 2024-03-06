import {format, parse} from 'date-fns'

export const getDateTime = (date: string) => {
  const dateTime = parse(date, 'yyyy-MM-dd', new Date()).getTime()
  return dateTime
}

export const formatDate = (
  dateString: string,
  formatting = 'yyyy-MM-dd',
): string => {
  const result = format(new Date(dateString), formatting)
  return result
}
