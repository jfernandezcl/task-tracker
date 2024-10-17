import '../styles/Login-Register.css'
import { useLocation } from 'wouter'

function Login() {

  const [, navigate] = useLocation()

  const handleRegisterClick = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <section className='container'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='container-form'>
        <h1 className='title-login'>Login Here</h1>
        <label className='title-label'>Username</label>

        <div className='input-name'>
          <input className='input-form' type="text" placeholder="Enter your name" />
        </div>

        <label className='title-label'>Password</label>
        <div>
          <input className='input-form' type="password" placeholder="Enter your password" />
        </div>

        <div className='container-buttons'>
          <button className='form-buttons'>Log In</button>
        </div>
        <div className='container-buttons'>
          <button className='form-buttons' onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </form>
    </section>
  )
}

export default Login