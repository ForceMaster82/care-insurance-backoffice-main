import {ButtonVariants} from '@caredoc/ui-master'
import {
  Box,
  Button,
  ComboBox,
  type IComboBoxItemData,
  type IInput,
  Input,
} from '@caredoc/ui-web'
import React, {FormEvent, ReactElement, useRef, useState} from 'react'

const SEARCH_INPUT_WIDTH = 240
const SEARCH_BUTTON_WIDTH = 80
const SEARCH_COMBOBOX_WIDTH = 120

interface ISearchBarProps extends Pick<IInput, 'placeholder'> {
  category?: string
  categoryOptions?: IComboBoxItemData<string>[]
  onChangeCategory?: (value?: string) => void
  onChangeKeyword: (value: string) => void
  searchButtonVariant?: ButtonVariants
}

const SearchBar = ({
  searchButtonVariant = 'secondary',
  categoryOptions,
  onChangeCategory,
  onChangeKeyword,
  category,
  placeholder,
}: ISearchBarProps): ReactElement => {
  const [inputValue, setInputValue] = useState('')
  const [categoryValue, setCategoryValue] = useState(category)
  const formRef = useRef<HTMLFormElement>(null)

  const handleOnSubmitForm = (event: FormEvent): void => {
    onChangeKeyword(inputValue)
    onChangeCategory?.(categoryValue)
    event.preventDefault()
  }

  const handleOnSelectCategoryItem = (categoryItem?: string): void => {
    setCategoryValue(categoryItem)
  }

  const handleOnClickSearch = (): void => {
    formRef.current?.requestSubmit()
  }

  const handleOnResetSearch = (): void => {
    setInputValue('')
    onChangeKeyword('')
  }
  return (
    <Box alignItems="center" flexDirection="row" gap="xs">
      {category && categoryOptions && onChangeCategory && (
        <Box width={SEARCH_COMBOBOX_WIDTH}>
          <ComboBox<string>
            items={categoryOptions}
            onSelect={handleOnSelectCategoryItem}
            size="sm"
            value={categoryValue}
          />
        </Box>
      )}
      <form onSubmit={handleOnSubmitForm} ref={formRef}>
        <Box alignItems="center" flexDirection="row" gap="xs">
          <Box width={SEARCH_INPUT_WIDTH}>
            <Input
              affix={inputValue ? 'close-circle' : undefined}
              onClickAffixIcon={handleOnResetSearch}
              onTextChange={(text): void => setInputValue(text)}
              placeholder={placeholder}
              value={inputValue}
            />
          </Box>
          <Box width={SEARCH_BUTTON_WIDTH}>
            <Button
              color="primary"
              onClick={handleOnClickSearch}
              size="sm"
              variant={searchButtonVariant}
            >
              검색
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default SearchBar
