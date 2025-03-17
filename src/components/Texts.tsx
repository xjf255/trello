import React, { useId, useState } from "react"
import "../styles/Text.css"

export const Texts = React.memo(({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const id = useId()

  const handleSeeMore = () => {
    setIsExpanded((prev) => !prev)
  }

  if (text.length < 100) {
    return <p>{text}</p>
  }

  return (
    <>
      <p className={`text ${isExpanded ? "expanded" : ""}`} id={id}>{text}</p>
      <button
        className="see--more"
        onClick={handleSeeMore}
        aria-expanded={isExpanded}
        aria-controls={id}
        aria-label={isExpanded ? "Ver menos" : "Ver más"}
      >
        {isExpanded ? "ver menos" : "ver más"}
      </button>
    </>
  )
})