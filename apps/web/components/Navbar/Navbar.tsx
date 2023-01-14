import Link from 'next/link'

const Navbar = () => {
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
          <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link" className="secondary">
              Account
            </summary>
            <ul role="listbox">
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
