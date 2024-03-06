import * as React from 'react'

function SvgCareLab(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M30.688 3.008a2.933 2.933 0 012.624 0l26.4 13.2a2.933 2.933 0 011.621 2.624V58.4a2.933 2.933 0 01-2.933 2.933H48.055c-.397 0-.79-.08-1.156-.237-5.357-2.296-10.821-4.741-15.593-7.485l-14.004 7.384a2.934 2.934 0 01-1.368.338H5.6A2.933 2.933 0 012.667 58.4V18.832c0-1.111.627-2.127 1.621-2.624l26.4-13.2zm.823 44.494a50.225 50.225 0 01-.591-.384c-5.067-3.343-8.191-6.759-9.07-10.408-.674-2.807.613-5.352 2.486-6.603.92-.614 1.886-.853 2.751-.752.825.097 1.793.528 2.736 1.696a2.809 2.809 0 004.265.119c1.113-1.231 2.13-1.618 2.925-1.678.832-.062 1.759.21 2.682.88 1.934 1.406 3.269 4.139 2.988 6.667-.117 1.06-.7 2.269-1.797 3.589-1.082 1.303-2.519 2.538-4.025 3.629a40.172 40.172 0 01-4.114 2.592c-.497.274-.92.494-1.236.653zm-5.363 2.8L15.34 56H8V20.315l24-12 24 12V56h-7.452c-4.07-1.75-8.035-3.525-11.632-5.399a43.53 43.53 0 003.073-2.024c1.711-1.24 3.531-2.773 5-4.542 1.456-1.753 2.719-3.92 2.995-6.407.506-4.561-1.776-9.116-5.154-11.57-1.732-1.259-3.884-2.06-6.216-1.884-1.595.12-3.127.684-4.533 1.676-1.33-1.01-2.818-1.61-4.374-1.792-2.305-.27-4.523.405-6.334 1.614-3.587 2.397-5.945 7.143-4.707 12.285 1.206 5.015 4.914 9.025 9.482 12.344z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCareLab