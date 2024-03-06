const calculateStartPageNumber = (
  currentPageNumber: number,
  pageLimit: number,
): number => {
  const startPageNumber =
    Math.floor((currentPageNumber - 1) / pageLimit) * pageLimit + 1
  return startPageNumber
}

const calculateEndPageNumber = (
  startPageNumber: number,
  pageLimit: number,
  lastPageNumber: number,
): number => {
  const endPageNumber =
    startPageNumber + pageLimit - 1 < lastPageNumber
      ? startPageNumber + pageLimit - 1
      : lastPageNumber
  return endPageNumber
}

export const createDisplayedPageList = (
  currentPageNumber: number,
  lastPageNumber: number,
  pageLimit: number,
): number[] => {
  const startPageNumber = calculateStartPageNumber(currentPageNumber, pageLimit)
  const endPageNumber = calculateEndPageNumber(
    startPageNumber,
    pageLimit,
    lastPageNumber,
  )

  const displayedPageList = Array.from(
    {length: endPageNumber - startPageNumber + 1},
    (value, index) => {
      const pageNumber = startPageNumber + index
      return pageNumber
    },
  )

  return displayedPageList
}
