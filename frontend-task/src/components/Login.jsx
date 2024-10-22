import { useState } from 'react';
import '../styles/Login-Register.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Iniciando sesión');
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Almacenar el token
        console.log('Inicio de sesión exitoso, redirigiendo a las notas...');
        navigate('/'); // Redirigir a la página de notas
      } else {
        console.error('Error en la respuesta del login:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <section className='container'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='container-form'>
        <h1 className='title-login'>Login Here</h1>
        <label className='title-label'>Username</label>
        <input
          className='input-form'
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className='title-label'>Password</label>
        <input
          className='input-form'
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='container-buttons'>
          <button className='form-buttons' onClick={handleLogin}>Log In</button>
        </div>
        <div className='container-buttons'>
          <button className='form-buttons' type='button' onClick={() => navigate('/register')}>
            Go to Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
