import { useState } from 'react'
import '../styles/Login-Register.css'
import { useLocation } from 'wouter'

function Login() {
  const [, navigate] = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegisterClick = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem('token', token) // almacenar el token
        navigate('/') // redirigir al usuario después de iniciar sesión
      }

    } catch (error) {
      console.error('Error in the login request:', error);
    }
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    handleLogin(e)
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
          <input
            className='input-form'
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <label className='title-label'>Password</label>
        <div>
          <input
            className='input-form'
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='container-buttons'>
          <button className='form-buttons' onClick={handleLoginClick}>Log In</button>
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