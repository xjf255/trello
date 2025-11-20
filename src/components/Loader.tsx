import { createPortal } from "react-dom"
import { ThreeDots } from "react-loader-spinner"
import '../styles/Loader.css'

export const Loader = () => {
  return createPortal(
    <div className="dark">
      <section className="loaderContainer">
        <ThreeDots 
          visible
          color="#000"
          height="80"
          width="80"
        />
      </section>
    </div>
    , document.body
  )
}