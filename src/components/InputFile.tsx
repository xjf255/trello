import { IconUpload, Trash } from "./Icons"
import "../styles/InputFile.css"
import { useRef, useState, forwardRef } from "react"

interface Props {
  name: string
  typesAccepted: string
  customLoader?: boolean
  customFnUpload?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const InputFile = forwardRef<HTMLInputElement, Props>(
  (
    { name, typesAccepted, customLoader = false, customFnUpload }: Props, ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (customFnUpload) {
        customFnUpload(e)
      } else {
        inputRef.current?.click()
      }
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
      <>
        <input
          ref={(node) => {
            inputRef.current = node
            if (typeof ref === "function") {
              ref(node) 
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node
            }
          }}
          className="input__file"
          type="file"
          name={name}
          accept={typesAccepted}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {!customLoader && (
          <button onClick={handleUploadClick}>
            <IconUpload /> Upload File
          </button>
        )}
        {fileName && (
          <div className="info__file">
            <p>{fileName}</p>
            <button onClick={handleRemoveFile}>
              <Trash />
            </button>
          </div>
        )}
      </>
    )
  }
)