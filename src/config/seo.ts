/* eslint-disable camelcase */
import {DefaultSeoProps} from 'next-seo'

const url = 'https://backoffice.care-insurance.caredoc.kr'
const title = '케어인슈어런스 백오피스'
const description =
  '케어닥. 돌봄은 더하고, 걱정은 덜하게. 케어닥은 삶을 존중하는 돌봄 문화를 만들어갑니다.'

const SEO: DefaultSeoProps = {
  canonical: url,
  defaultTitle: title,
  description,
  facebook: {
    appId: '',
  },
  openGraph: {
    description,
    locale: 'ko_KR',
    site_name: title,
    title,
    type: 'website',
    url,
  },
}

export default SEO
