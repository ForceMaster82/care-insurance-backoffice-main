import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {useState} from 'react'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {IBusinessLicenseUpdate, ServerErrorFormat} from '~types/dto'
import {fetchBinary, IResponse} from '~utils/fetch'

type UseBusinessLicenseFile = () => {
  onUploadFile: (file: File | null) => void
  uploadFileMutation: UseMutationResult<
    IResponse<void>,
    ServerErrorFormat<unknown>,
    IBusinessLicenseUpdate,
    unknown
  >
  uploadedFile: File | null
}

const useBusinessLicenseFile: UseBusinessLicenseFile = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const uploadFileMutationFn = ({
    businessLicenseFile,
    organizationId,
  }: IBusinessLicenseUpdate): Promise<IResponse<void>> => {
    const formData = new FormData()
    formData.append(
      'business-license-file',
      businessLicenseFile,
      businessLicenseFile.name,
    )
    return fetchBinary<void>(
      apiPath.externalCaregivingOrganization.identified.businessLicense(
        organizationId,
      ),
      {body: formData, method: 'POST'},
    )
  }

  const uploadFileMutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IBusinessLicenseUpdate
  >(uploadFileMutationFn, {
    onError: (error) => {
      isLocalServerErrorType(error.errorType) &&
        // eslint-disable-next-line no-alert
        alert(
          errorMessages.externalOrganization?.[error.errorType] ||
            error.message,
        )
    },
  })
  const handleOnUploadFile = (file: File | null): void => {
    setUploadedFile(file)
  }

  return {
    onUploadFile: handleOnUploadFile,
    uploadFileMutation,
    uploadedFile,
  }
}

export default useBusinessLicenseFile
