import {useState} from 'react'

const DEFAULT_PAGE_NUMBER = 1

interface UsePaginationReturnType {
  onChangePage: (page: number) => void
  pageNumber: number
}
const usePagination = (
  initPageNumber = DEFAULT_PAGE_NUMBER,
): UsePaginationReturnType => {
  const [pageNumber, setPageNumber] = useState(initPageNumber)

  const handleOnChangePage = (page: number): void => {
    setPageNumber(page)
  }

  return {onChangePage: handleOnChangePage, pageNumber}
}

export default usePagination
