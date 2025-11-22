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
          height="50"
          width="80"
        />
        <strong className="loader__text">Loading...</strong>
      </section>
    </div>
    , document.body
  )
}