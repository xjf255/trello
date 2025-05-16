import instagram from '../../public/instagram.svg'
import facebook from '../../public/facebook.svg'
import whatsapp from '../../public/whatsapp.svg'

export default function MainFooter() {
  const PRODUCTS = [
    { name: 'Product 1', link: '#' },
    { name: 'Product 2', link: '#' },
    { name: 'Product 3', link: '#' }
  ]
  const COMPANY = [
    { name: 'About Us', link: '#' },
    { name: 'Privacy Policy', link: '#' },
    { name: 'Terms of Service', link: '#' }
  ]

  const CONTACT = [
    { name: 'Instagram', icon: <Instagram />, link: '#' },
    { name: 'Facebook', icon: <Instagram />, link: '#' },
    { name: 'WhatsApp', icon: <Instagram />, link: '#' }
  ]
  return (
    <footer>
      <div className="container">

      </div>
    </footer>
  )
}