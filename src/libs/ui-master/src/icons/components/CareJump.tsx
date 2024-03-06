import * as React from 'react'

function SvgCareJump(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M49.334 21.333V56h5.333V21.333h-5.334zM44 18.933A2.933 2.933 0 0146.933 16h10.134A2.933 2.933 0 0160 18.933V58.4a2.933 2.933 0 01-2.933 2.933H46.934A2.933 2.933 0 0144 58.4V18.933zM9.333 49.333V56h5.334v-6.667H9.333zM4 46.933A2.933 2.933 0 016.933 44h10.134A2.933 2.933 0 0120 46.933V58.4a2.933 2.933 0 01-2.933 2.933H6.933A2.933 2.933 0 014 58.4V46.933zM29.333 32v24h5.334V32h-5.334zM24 29.6a2.933 2.933 0 012.933-2.933h10.134A2.933 2.933 0 0140 29.6v28.8a2.933 2.933 0 01-2.933 2.933H26.933A2.933 2.933 0 0124 58.4V29.6zM50.026 3.599a2.667 2.667 0 01-.291 3.76L34.74 20.202l-8.626-2.955L7.096 34a2.667 2.667 0 11-3.525-4.002l21.342-18.801 8.672 2.97 12.68-10.86a2.667 2.667 0 013.76.29z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCareJump