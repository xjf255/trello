import { useState, useRef } from "react"
import "../styles/Document.css"
import { Plus } from "lucide-react"

export function Document() {
  const initialHeader = Array(9).fill("")
  const initialRows = Array.from({ length: 20 }, () => Array(9).fill(""))

  const [headers, setHeaders] = useState(initialHeader)
  const [rows, setRows] = useState(initialRows)
  const [title, setTitle] = useState("Document title")
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleExport = () => {
    // Generate CSV content
    const csvContent = [
      headers.map(h => `"${(h || "").replace(/"/g, '""')}"`).join(","),
      ...rows.map(row => row.map(cell => `"${(cell || "").replace(/"/g, '""')}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${title.trim() || "document"}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const triggerImport = () => {
    fileInputRef.current?.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      if (!text) return

      // Simple CSV parser that handles double quotes
      const parseCSV = (csvText: string) => {
        const lines: string[][] = []
        let line: string[] = []
        let currentCell = ""
        let insideQuote = false

        for (let i = 0; i < csvText.length; i++) {
          const char = csvText[i]
          const nextChar = csvText[i + 1]

          if (char === '"') {
            if (insideQuote && nextChar === '"') {
              currentCell += '"'
              i++ // Skip next double quote
            } else {
              insideQuote = !insideQuote
            }
          } else if (char === ',' && !insideQuote) {
            line.push(currentCell)
            currentCell = ""
          } else if ((char === '\n' || char === '\r') && !insideQuote) {
            if (char === '\r' && nextChar === '\n') {
              i++ // Skip LF if it follows CR
            }
            line.push(currentCell)
            lines.push(line)
            line = []
            currentCell = ""
          } else {
            currentCell += char
          }
        }
        if (currentCell || line.length > 0) {
          line.push(currentCell)
          lines.push(line)
        }
        return lines
      }

      const parsedLines = parseCSV(text).filter(line => line.length > 0 && line.some(cell => cell.trim() !== ""))
      if (parsedLines.length > 0) {
        const newHeaders = parsedLines[0]
        const newRows = parsedLines.slice(1)
        setHeaders(newHeaders)
        // If there are no data rows, initialize with an empty row matching headers count
        setRows(newRows.length > 0 ? newRows : [Array(newHeaders.length).fill("")])
      }
    }
    reader.readAsText(file)
    // Clear input value so same file can be imported again if needed
    event.target.value = ""
  }

  return (
    <section>
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
            <button onClick={handleExport}>Export</button>
            <button onClick={triggerImport}>Import</button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".csv"
              style={{ display: "none" }}
            />
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
    </section>
  )
}