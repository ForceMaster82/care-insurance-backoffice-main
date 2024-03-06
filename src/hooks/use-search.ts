import {useState} from 'react'
import {QueryType} from '~types/dto'

interface UseSearchReturnType {
  category: string | undefined
  keyword: string
  onChangeCategory: (value?: string) => void
  onChangeKeyword: (value: string) => void
  query?: QueryType
}

const useSearch = (defaultCategory?: string): UseSearchReturnType => {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState<string | undefined>(defaultCategory)
  const query: QueryType | undefined =
    keyword && category ? `${category}:${keyword}` : undefined

  const onChangeKeyword = (value: string): void => {
    setKeyword(value)
  }

  const onChangeCategory = (value?: string): void => {
    setCategory(value)
  }
  return {category, keyword, onChangeCategory, onChangeKeyword, query}
}

export default useSearch
