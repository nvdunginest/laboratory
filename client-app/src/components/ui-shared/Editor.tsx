import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: [] }],
  [{ color: [] }, { background: [] }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image']
]

type EditorProps = {
  value: string
  onChange: (content: string) => void
}

export default function Editor({ value, onChange }: EditorProps): JSX.Element {
  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions
      }}
      value={value}
      onChange={(content) => {
        onChange(content)
      }}
    />
  )
}
