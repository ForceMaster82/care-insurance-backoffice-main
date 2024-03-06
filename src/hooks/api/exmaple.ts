export {}
// import {Urgency} from '~types'
// import {IReceptionRegistration} from '~types/dto'
// import {IReceptionDataForm} from '~types/form'
// import getIsoString from '~utils/get-iso-string'

// type UseReceptionRegister = {
//   onSubmitReceptionRegister: (
//     data: IReceptionDataForm,
//     urgency: Urgency,
//     managerId: string,
//     isDesiredDateFixed: boolean,
//   ) => Promise<Response | void>
// }

// const transformData = (
//   data: IReceptionDataForm,
//   urgency: Urgency,
//   managerId: string,
//   isDesiredDateFixed: boolean,
// ): IReceptionRegistration | null => {
//   if (
//     !data.claimType ||
//     data.caregivingLimitPeriod === null ||
//     !data.coverageId ||
//     data.patientAge === null ||
//     !data.patientSex
//   ) {
//     return null
//   }

//   const transformedData: IReceptionRegistration = {
//     accidentInfo: {
//       accidentDateTime: getIsoString(data.accidentDateTime),
//       accidentNumber: data.accidentNumber,
//       admissionDateTime: getIsoString(data.admissionDateTime),
//       claimType: data.claimType,
//       hospitalRoomInfo: {
//         city: null,
//         hospitalAndRoom: data.hospitalAndRoom,
//         state: null,
//       },
//       patientDescription: data.patientDescription,
//     },
//     additionalRequests: data.additionalRequests,
//     desiredCaregivingPeriod: isDesiredDateFixed ? data.desiredPeriod : null,
//     desiredCaregivingStartDate: data.desiredCaregivingStartDate,
//     insuranceInfo: {
//       caregivingLimitPeriod: data.caregivingLimitPeriod,
//       coverageId: data.coverageId,
//       insuranceNumber: data.insuranceNumber,
//       subscriptionDate: data.subscriptionDate,
//     },
//     insuranceManagerInfo: {
//       branchName: data.branchName,
//       phoneNumber: data.receptionPhoneNumber,
//       receptionistName: data.receptionName,
//     },
//     patientInfo: {
//       age: data.patientAge,
//       name: data.patientName,
//       nickname: data.patientNickname,
//       primaryContact: {
//         phoneNumber: data.primaryContactPhoneNumber,
//         relationshipWithPatient: data.primaryContactRelationshipWithPatient,
//       },
//       secondaryContact:
//         data.secondaryContactPhoneNumber &&
//         data.secondaryContactPhoneNumberRelationshipWithPatient
//           ? {
//               phoneNumber: data.secondaryContactPhoneNumber,
//               relationshipWithPatient:
//                 data.secondaryContactPhoneNumberRelationshipWithPatient,
//             }
//           : null,
//       sex: data.patientSex,
//     },
//     registerManagerInfo: {
//       managingUserId: managerId,
//     },
//     urgency: urgency,
//   }
//   return transformedData
// }

// const useReceptionRegister = (): UseReceptionRegister => {
//   const handelOnChangeReceptionRegisterItem = async (
//     data: IReceptionDataForm,
//     urgency: Urgency,
//     managerId: string,
//     isDesiredDateFixed: boolean,
//   ): Promise<Response | void> => {
//     const transformedData = transformData(
//       data,
//       urgency,
//       managerId,
//       isDesiredDateFixed,
//     )
//     if (!transformedData) {
//       return
//     }
//     const response = await fetch('url', {
//       body: JSON.stringify(transformedData),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     })
//     return response
//   }

//   return {
//     onSubmitReceptionRegister: handelOnChangeReceptionRegisterItem,
//   }
// }

// export default useReceptionRegister
