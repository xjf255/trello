import { IconUpload, Trash } from "./Icons"
import "../styles/InputFile.css"
import { useRef, useState } from "react"

interface Props {
  name: string
}

export function InputFile({ name }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    inputRef.current?.click()
  }

  const handleFileChange = () => {
    const fileInput = inputRef.current
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setFileName("No se ha cargado ninguna imagen")
      return
    }

    setFileName(fileInput.files[0].name)
  }

  const handleRemoveFile = () => {
    setFileName(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <label>
      avatar:
      <input
        ref={inputRef}
        className="input__file"
        type="file"
        name={name}
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button onClick={handleUploadClick}>
        <IconUpload /> Upload File
      </button>
      {fileName && (
        <div className="info__file">
          <p>{fileName}</p>
          <button onClick={handleRemoveFile}>
            <Trash />
          </button>
        </div>
      )}
    </label>
  )
}
