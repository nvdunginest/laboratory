import React from 'react'
import { CircularProgress } from '@material-ui/core'

import IconButton from './IconButton'

type DownloadButtonProps = {
  url: string
  filename: string
  label?: string
}

export default function DownloadButton({
  url,
  filename,
  label = ''
}: DownloadButtonProps): JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [percent, setPercent] = React.useState<number>(0)
  const handleDownload = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'

    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.onload = () => {
      setIsLoading(false)
      setPercent(0)
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response])
        const downloadUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
      }
    }
    xhr.onprogress = (event) => {
      if (event.total === 0) {
        setPercent(0)
      } else {
        setPercent(event.loaded / event.total)
      }
    }
    setIsLoading(true)
    xhr.send()
  }

  return isLoading ? (
    <CircularProgress
      size='1.3rem'
      variant='indeterminate'
      value={percent * 100}
    />
  ) : (
    <IconButton
      color='primary'
      tooltip='Tải file về máy'
      text={label}
      icon='download'
      onClick={() => {
        handleDownload()
      }}
    />
  )
}
