import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const { authUser } = useAuth()
  const { cart } = useCart()

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <Link href="/" className="contrast">
            <strong>Livecampus</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          {authUser ? (
            <div style={{ display: 'flex' }}>
              <span style={{ marginRight: 20 }}>Logged in as {authUser.email}</span>
              <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" className="secondary">
                  Account
                </summary>
                <ul role="listbox">
                  <li>
                    <Link href="/cart">
                      Cart ({cart.reduce((prev: any, curr: any) => prev + curr.price, 0)}$)
                    </Link>
                  </li>
                  <li>
                    <Link href="/account">Settings</Link>
                  </li>
                  <li>
                    <Link href="/logout">Logout</Link>
                  </li>
                </ul>
              </details>
            </div>
          ) : (
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link" className="secondary">
                Account
              </summary>
              <ul role="listbox">
                <li>
                  <Link href="/cart">
                    Cart ({cart.reduce((prev: any, curr: any) => prev + curr.price, 0)}$)
                  </Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </details>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
