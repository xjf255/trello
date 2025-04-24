import { useState } from "react"
import "../styles/Document.css"
import { Plus } from "lucide-react"

export function Document() {
  const initialHeader = Array(9).fill("")
  const initialRows = Array.from({ length: 9 }, () => Array(9).fill(""))

  const [headers, setHeaders] = useState(initialHeader)
  const [rows, setRows] = useState(initialRows)
  const [title, setTitle] = useState("Document title")

  const handleHeaderChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeaders = [...headers]
    newHeaders[index] = event.target.value
    setHeaders(newHeaders)
  }

  const handleRowChange = (rowIndex: number, cellIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = rows.map((row) => [...row]) // Create a deep copy of rows
    newRows[rowIndex][cellIndex] = event.target.value
    setRows(newRows)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleAddColumn = () => {
    setHeaders([...headers, ""])
    setRows((prev) => prev.map((row) => [...row, ""]))
  }

  // Add a new row
  const handleAddRow = () => {
    setRows((prev) => [...prev, Array(headers.length).fill("")])
  }

  return (
    <div className="document">
      <header>
        <input
          type="text"
          className="document__title"
          defaultValue={title}
          placeholder="Document title"
          onChange={handleTitleChange}
        />
        <span>
          <button>Export</button>
          <button>Import</button>
        </span>
      </header>
      <section>
        <div className="table-container">
          <table className="document__board">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>
                    {index === 0 ? (
                      "Id"
                    ) : (
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => handleHeaderChange(index, e)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      {cellIndex === 0 ? (
                        rowIndex
                      ) : (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleRowChange(rowIndex, cellIndex, e)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <i onClick={handleAddColumn} className="column--add">
          <Plus />
        </i>
        <i onClick={handleAddRow} className="row--add">
          <Plus />
        </i>
      </section>
    </div>
  )
}