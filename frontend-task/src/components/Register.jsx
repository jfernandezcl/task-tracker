import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login-Register.css';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Registrando usuario...');
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Registro exitoso, redirigiendo a inicio de sesión...');
        navigate('/login'); // Redirigir a la página de inicio de sesión después del registro
      } else {
        console.error('Error en la respuesta del registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };

  return (
    <section className='container'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='container-form' onSubmit={handleRegister}>
        <h1 className='title-login'>Register Here</h1>
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
          <button className='form-buttons' type='button'>Register</button>
        </div>
        <div className='container-buttons'>
          <button className='form-buttons' type='button' onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
