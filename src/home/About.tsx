import { InstagramIcon, WhatsappIcon } from "../verification/components/Icons"
import "../styles/About.css"

export const About = () => {
  return (
    <div className="contact">
      <div className="contact__about">
        <h1>About Us</h1>
        <p className="about__description">
          Innovative technological solutions that optimize the lives of people and businesses. We focus on creating efficient, intuitive, and secure products and services that allow our customers to maximize their potential and simplify their daily processes. Through technology, we seek to improve productivity, connectivity, and the digital experience in a constantly evolving world.
        </p>
      </div>

      <div className="contact__info">
        <div>
          <h2>Contact Information</h2>
          <address>
            <div>
              <strong>Address:</strong> Antigua Guatemala,Guatemala
            </div>
            <div>
              <strong>Email:</strong>
              <a href="mailto:optimizedlife291@gmail.com">optimizedlife291@gmail.com</a>
            </div>
            <div>
              <strong>Phone:</strong>
              <a href="tel:+50251450650">+502 5145-0650</a>
            </div>
          </address>
        </div>

        <div>
          <h2>Connect With Us</h2>
          <div>
            <div className="item__icon">
              <WhatsappIcon />
              <a href="https://wa.me/51450650">+502 5145-0650</a>
            </div>
            <div className="item__icon">
              <a href="https://www.instagram.com/optimizedlife.one/">
                <InstagramIcon /> @optimizedLife.one
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}