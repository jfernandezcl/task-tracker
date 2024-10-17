import '../styles/Login-Register.css';

function Register() {

  return (
    <section className='container'>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className='container-form'>
        <h1 className='title-login'>Register</h1>
        <label className='title-label'>Username</label>

        <div className='input-name'>
          <input className='input-form' type="text" placeholder="Enter your name" />
        </div>

        <label className='title-label'>Password</label>
        <div>
          <input className='input-form' type="password" placeholder="Enter your password" />
        </div>

        <div className='container-buttons'>
          <button className='form-buttons'>
            Register</button>
        </div>
        <div className='container-buttons'>
          <button className='form-buttons'>Log In</button>
        </div>
      </form>
    </section>
  )
}

export default Register