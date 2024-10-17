import { useLocation } from 'wouter'
import '../styles/Navbar.css'

function Navbar() {

  const [, navigate] = useLocation()

  const handleLogout = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <div className='container-navbar'>
        <button className="button-logout" onClick={handleLogout}>Log out</button>
      </div>
    </>
  )
}

export default Navbar