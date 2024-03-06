import {useState} from 'react'
import {QueryType} from '~types/dto'

interface UseManagerSearchReturnType {
  category?: string
  keyword: string
  onChangeCategory: (value?: string) => void
  onChangeKeyword: (value: string) => void
  onChangeOrganization: (value?: string) => void
  organizationId?: string
  query?: QueryType
}

const useManagerSearch = (
  defaultCategory?: string,
  defaultOrganizationId?: string,
): UseManagerSearchReturnType => {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState<string | undefined>(defaultCategory)
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | undefined
  >(defaultOrganizationId)

  const query: QueryType | undefined =
    keyword && category ? `${category}:${keyword}` : undefined

  const onChangeKeyword = (value: string): void => {
    setKeyword(value)
  }

  const onChangeCategory = (value?: string): void => {
    setCategory(value)
  }

  const onChangeOrganization = (value?: string): void => {
    setSelectedOrganizationId(value)
  }

  return {
    category,
    keyword,
    onChangeCategory,
    onChangeKeyword,
    onChangeOrganization,
    organizationId: selectedOrganizationId,
    query,
  }
}

export default useManagerSearch
