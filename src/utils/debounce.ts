const DEFAULT_DELAY = 500
export const debounce = (
  callback: (...args: any[]) => void,
  delay = DEFAULT_DELAY,
) => {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}
