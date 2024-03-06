import type {IComboBoxItemData} from '@caredoc/ui-web'
import {
  COVERAGE_MAX_SUBSCRIPTION_YEAR,
  COVERAGE_MIN_SUBSCRIPTION_YEAR,
  EXTERNAL_CAREGIVING_ORGANIZATION_TYPE,
} from './texts'
import {
  COVERAGE_PATH,
  EXTERNAL_MANAGER_PATH,
  EXTERNAL_ORGANIZATION_PATH,
  INTERNAL_MANAGER_PATH,
} from './route-paths'
import {NavigationItemType, SideBarMapType} from '~types'
import {ExternalOrganizationType} from '~types/dto'

/** gnb */
export const navigationItemList: NavigationItemType[] = [
  {
    category: 'MASTER_DATA',
    path: EXTERNAL_ORGANIZATION_PATH,
    title: '기준정보 관리',
  },
  {
    category: 'ACCOUNT_MANAGEMENT',
    path: EXTERNAL_MANAGER_PATH,
    title: '계정 관리',
  },
]

export const sidebarItemMap: SideBarMapType = {
  ACCOUNT_MANAGEMENT: [
    {
      pageKey: 'EXTERNAL_MANAGER',
      path: EXTERNAL_MANAGER_PATH,
      title: '제휴사 계정 관리',
    },
    {
      pageKey: 'INTERNAL_MANAGER',
      path: INTERNAL_MANAGER_PATH,
      title: '관리자 계정 관리',
    },
  ],
  MASTER_DATA: [
    {
      pageKey: 'EXTERNAL_ORGANIZATION',
      path: EXTERNAL_ORGANIZATION_PATH,
      title: '제휴사(협회) 관리',
    },
    {pageKey: 'COVERAGE', path: COVERAGE_PATH, title: '가입담보 관리'},
  ],
}

/** 협회 */
export const externalOrganizationTypeCategories: IComboBoxItemData<ExternalOrganizationType>[] =
  [
    {
      data: 'AFFILIATED',
      label: EXTERNAL_CAREGIVING_ORGANIZATION_TYPE['AFFILIATED'],
    },
    {
      data: 'ORGANIZATION',
      label: EXTERNAL_CAREGIVING_ORGANIZATION_TYPE['ORGANIZATION'],
    },
  ]

export const profitAllocationRatio: IComboBoxItemData<number>[] = [
  {data: 0, label: '0%'},
  {data: 0.1, label: '10%'},
  {data: 0.2, label: '20%'},
  {data: 0.3, label: '30%'},
  {data: 0.4, label: '40%'},
  {data: 0.5, label: '50%'},
  {data: 0.6, label: '60%'},
  {data: 0.7, label: '70%'},
  {data: 0.8, label: '80%'},
  {data: 0.9, label: '90%'},
  {data: 1, label: '100%'},
]

export const bankList: IComboBoxItemData<string>[] = [
  {data: '경남은행', label: '경남은행'},
  {data: '광주은행', label: '광주은행'},
  {data: '국민은행', label: '국민은행'},
  {data: '기업은행', label: '기업은행'},
  {data: '농협은행', label: '농협은행'},
  {data: '대구은행', label: '대구은행'},
  {data: '도이치은행', label: '도이치은행'},
  {data: '부산은행', label: '부산은행'},
  {data: '비엔피파리바은행', label: '비엔피파리바은행'},
  {data: '산림조합중앙회', label: '산림조합중앙회'},
  {data: '산업은행', label: '산업은행'},
  {data: '새마을금고중앙회', label: '새마을금고중앙회'},
  {data: '수협은행', label: '수협은행'},
  {data: '신한은행', label: '신한은행'},
  {data: '신협', label: '신협'},
  {data: '우리은행', label: '우리은행'},
  {data: '우체국', label: '우체국'},
  {data: '저축은행', label: '저축은행'},
  {data: '전북은행', label: '전북은행'},
  {data: '제이피모건체이스은행', label: '제이피모건체이스은행'},
  {data: '제주은행', label: '제주은행'},
  {data: '중국건설은행', label: '중국건설은행'},
  {data: '중국공상은행', label: '중국공상은행'},
  {data: '중국은행', label: '중국은행'},
  {data: '카카오뱅크', label: '카카오뱅크'},
  {data: '케이뱅크', label: '케이뱅크'},
  {data: '토스뱅크', label: '토스뱅크'},
  {data: '하나은행', label: '하나은행'},
  {data: '한국씨티은행', label: '한국씨티은행'},
  {data: 'BOA', label: 'BOA'},
  {data: 'HSBC', label: 'HSBC'},
  {data: 'SC제일은행', label: 'SC제일은행'},
  {data: '교보증권', label: '교보증권'},
  {data: '다올투자증권', label: '다올투자증권'},
  {data: '대신증권', label: '대신증권'},
  {data: '메리츠증권주식회사', label: '메리츠증권주식회사'},
  {data: '미래에셋증권', label: '미래에셋증권'},
  {data: '부국증권', label: '부국증권'},
  {data: '삼성증권', label: '삼성증권'},
  {data: '상상인증권', label: '상상인증권'},
  {data: '신영증권', label: '신영증권'},
  {data: '신한투자증권', label: '신한투자증권'},
  {data: '유안타증권', label: '유안타증권'},
  {data: '유진투자증권', label: '유진투자증권'},
  {data: '이베스트투자증권', label: '이베스트투자증권'},
  {data: '카카오페이증권', label: '카카오페이증권'},
  {data: '케이프투자증권', label: '케이프투자증권'},
  {data: '키움증권', label: '키움증권'},
  {data: '토스증권', label: '토스증권'},
  {data: '하나증권', label: '하나증권'},
  {data: '하이투자증권', label: '하이투자증권'},
  {data: '한국투자증권', label: '한국투자증권'},
  {data: '한국포스증권', label: '한국포스증권'},
  {data: '한화투자증권', label: '한화투자증권'},
  {data: '현대차증권', label: '현대차증권'},
  {data: 'BNK투자증권', label: 'BNK투자증권'},
  {data: 'DB금융투자', label: 'DB금융투자'},
  {data: 'IBK투자증권', label: 'IBK투자증권'},
  {data: 'KB증권', label: 'KB증권'},
  {data: 'NH투자증권', label: 'NH투자증권'},
  {data: 'SK증권', label: 'SK증권'},
]

/** 제휴사 계정 관리 */
export const managerSearchCategoryOptions: IComboBoxItemData<
  'email' | 'name'
>[] = [
  {data: 'email', label: '아이디'},
  {data: 'name', label: '담당자명'},
]

export const coverageTargetSubscriptionYearOptions: IComboBoxItemData<number>[] =
  Array.from(
    {
      length:
        COVERAGE_MAX_SUBSCRIPTION_YEAR - COVERAGE_MIN_SUBSCRIPTION_YEAR + 1,
    },
    (_, index) => {
      const year = COVERAGE_MIN_SUBSCRIPTION_YEAR + index
      return {data: year, label: `${year}`}
    },
  )
