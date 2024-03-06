import * as React from 'react'

function SvgHelpOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zM2.667 32C2.667 15.8 15.8 2.667 32 2.667S61.333 15.8 61.333 32 48.2 61.333 32 61.333 2.667 48.2 2.667 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M30.385 21.824c-1.495.69-2.7 2.014-3.254 3.352a2.667 2.667 0 01-4.929-2.038c1.057-2.555 3.21-4.892 5.948-6.156 2.81-1.297 6.255-1.46 9.605.434 1.612.832 3.214 2.709 3.893 4.928.77 2.513.377 5.532-2.23 8.103l-.064.065-.07.06c-1.647 1.416-4.17 3.647-5.348 7.535a2.667 2.667 0 01-5.104-1.547c1.627-5.368 5.117-8.434 6.899-9.967.566-.576.79-1.072.878-1.447.095-.398.071-.812-.06-1.24a3.643 3.643 0 00-.66-1.211 3.077 3.077 0 00-.39-.402 1.22 1.22 0 00-.19-.137l-.073-.036-.07-.041c-1.738-.996-3.375-.904-4.78-.255zM31.333 42.667A2.667 2.667 0 0134 45.333v.1a2.667 2.667 0 11-5.333 0v-.1a2.667 2.667 0 012.666-2.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHelpOutlined