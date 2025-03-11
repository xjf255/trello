import { useId } from "react"
import "../styles/Text.css"

export function Texts({text}: {text:string}) {
  const id = useId()
  if (text.length < 100) {
    return (
      <p>{text}</p>
    )
  }

  const handleSeeMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const $p = document.getElementById(id)
    if ($p) {
      if (e.currentTarget.textContent === "ver más") {
        $p.style.display = "block"
        e.currentTarget.textContent = "ver menos"
      }
      else {
        $p.style.display = "-webkit-box"
        e.currentTarget.textContent = "ver más"
      }
    }
  }

  return (
    <>
      <p className="text" id={id}>{text}</p>
      <a className="see--more" onClick={handleSeeMore}>ver más</a>
    </>
  )
}