import {FileInput} from '@caredoc/templates-web'
import {Box, Button, Input} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'

interface IUploadInputProps {
  buttonText?: string
  fileName?: string
  onResetFile?: () => void
  onUploadFile: (files: FileList | null) => void
  placeholder?: string
}

const UploadInput = ({
  onUploadFile,
  fileName = '',
  buttonText = '파일 선택',
  placeholder,
  onResetFile,
}: IUploadInputProps): ReactElement => {
  return (
    <Box alignItems="center" flexDirection="row" gap="xs">
      <Input
        affix={fileName && onResetFile ? 'close-circle' : undefined}
        disabled={Boolean(fileName)}
        onClickAffixIcon={onResetFile}
        placeholder={placeholder}
        readonly
        style={{flex: 1}}
        value={fileName}
      />
      <FileInput
        onFileChanged={onUploadFile}
        renderTarget={(openFileInput): ReactElement => (
          <Button color="primary" onClick={openFileInput} variant="secondary">
            {buttonText}
          </Button>
        )}
      />
    </Box>
  )
}

export default UploadInput
